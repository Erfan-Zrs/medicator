import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { medicationListResolver } from './pages/medication-tracking/resolver/medication-tracker.resolver';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'medication-tracker',
    // implementing lazy loading for faster initial load and better user experience
    loadChildren: () =>
      import('./pages/medication-tracking/medication-tracking.module').then(
        (m) => m.MedicationTrackingModule
      ),
    // implement resolver to prefetch data
    resolve: {
      medications: medicationListResolver,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
