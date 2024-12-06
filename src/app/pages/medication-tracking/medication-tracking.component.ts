import { Component, OnInit } from '@angular/core';
import { MedicationList } from '../../models/medication-list';
import { BehaviorSubject } from 'rxjs';
import { medicationTrackerService } from '../../shared/services/medication-tracker.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medication-tracking',
  templateUrl: './medication-tracking.component.html',
  styleUrls: ['./medication-tracking.component.css'],
})
export class MedicationTrackingComponent implements OnInit {
  showModal: boolean = false;
  formValues: any;
  private medicationslist: MedicationList[] = [];
  public filteredMedications$ = new BehaviorSubject<MedicationList[]>([]);

  constructor(
    private medicationTrackerService: medicationTrackerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicationslist = this.route.snapshot.data['medications'];
    this.handleSearchMedicine('');
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
  onFormValuePassed(data: any) {
    this.formValues = data;
  }
  handleSubmit() {
    console.log(this.formValues);
  }
}
