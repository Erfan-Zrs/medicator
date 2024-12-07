import { Component, OnInit } from '@angular/core';
import { MedicationList } from '../../models/medication-list';
import { BehaviorSubject, Subscription } from 'rxjs';
import { medicationTrackerService } from '../../shared/services/medication-tracker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medication-tracking',
  templateUrl: './medication-tracking.component.html',
  styleUrls: ['./medication-tracking.component.css'],
})
export class MedicationTrackingComponent implements OnInit {
  showModal: boolean = false;
  modalData!: MedicationList | null;
  private medicationslist: MedicationList[] = [];
  public filteredMedications$ = new BehaviorSubject<MedicationList[]>([]);

  constructor(
    private medicationTrackerService: medicationTrackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicationslist = this.route.snapshot.data['medications'];
    this.filteredMedications$.next(this.medicationslist);
  }

  handleSearchMedicine(searchString: string) {
    const filteredItems: MedicationList[] = this.medicationslist.filter(
      (item) => {
        return item.medicationName
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase());
      }
    );
    this.filteredMedications$.next(filteredItems);
  }
  openModal(data?: MedicationList): void {
    this.showModal = true;
    if (data) {
      this.modalData = data;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.modalData = null;
  }

  handleSubmit(data: any, method: 'update' | 'create') {
    let sendingData =
      method === 'create'
        ? {
            ...data,
            lastUpdate: new Date(),
            id: this.generateId(),
          }
        : {
            ...data,
            lastUpdate: new Date(),
          };

    method === 'create'
      ? this.medicationTrackerService.addMedication(sendingData)
      : this.medicationTrackerService.updateMedication(sendingData);
    this.updateHandler();
  }
  handleDelete(id: any) {
    this.medicationTrackerService.deleteMedication(id);
  }
  generateId(): string {
    return crypto.randomUUID();
  }
  updateHandler() {
    this.medicationTrackerService.getMedicationList().subscribe((data) => {
      this.medicationslist = data;
      this.filteredMedications$.next(this.medicationslist);
    });
  }
}
