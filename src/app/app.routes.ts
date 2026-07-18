import { Routes } from '@angular/router';

import { TrackListComponent } from './pages/track-list/track-list.component';
import { TrackDetailsComponent } from './pages/track-details/track-details.component';

export const routes: Routes = [
  { path: '', component: TrackListComponent },
  { path: 'track/:id', component: TrackDetailsComponent },
  { path: '**', redirectTo: '' }
];
