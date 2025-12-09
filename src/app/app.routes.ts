import { Routes } from '@angular/router';
import { GradeDetailComponent } from './pages/grade-detail/grade-detail.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'grade/:index', component: GradeDetailComponent },
  { path: '**', redirectTo: '' },
];
