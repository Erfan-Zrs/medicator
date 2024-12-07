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
  private medicationslist: MedicationList[] = [];
  public filteredMedications$ = new BehaviorSubject<MedicationList[]>([]);
  private subscriptions: Subscription[] = [];

  constructor(
    private medicationTrackerService: medicationTrackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicationslist = this.route.snapshot.data['medications'];
    const subscription = this.medicationTrackerService
      .getMedicationList()
      .subscribe((data: MedicationList[]) => {
        this.medicationslist = data;
        this.handleSearchMedicine('');
      });
    this.subscriptions.push(subscription);
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
  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleSubmit(data: any) {
    let sendingData = { ...data, lastUpdate: new Date() };
    this.medicationTrackerService.addMedication(sendingData);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
