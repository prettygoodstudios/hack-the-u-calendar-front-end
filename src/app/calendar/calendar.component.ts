import { Component, OnInit } from '@angular/core';
import { Calendar } from '../calendar';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendars: Calendar[];
  
  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.getCalendars();
  }

  getCalendars(): void {
    this.calendarService.getCalendars()
      .subscribe(calendars => this.calendars = calendars);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.calendarService.addCalendar({ name } as Calendar)
      .subscribe(calendar => {
        this.calendars.push(calendar);
      });
  }

  delete(calendar: Calendar): void {
    this.calendars = this.calendars.filter(c => c !== calendar);
    this.calendarService.deleteCalendar(calendar).subscribe();
  }
}
