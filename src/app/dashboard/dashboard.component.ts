import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  calendars: Calendar[] = [];

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.getCalendars();
  }

  getCalendars(): void {
    this.calendarService.getCalendars()
      .subscribe(calendars => this.calendars = calendars.slice(1, 5));
  }
}
