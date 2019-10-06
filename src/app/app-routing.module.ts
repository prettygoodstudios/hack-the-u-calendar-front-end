import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CalendarDetailComponent } from './calendar-detail/calendar-detail.component';

const routes: Routes = [
  { path: 'calendars', component: CalendarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  { path: 'detail/:id', component: CalendarDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
