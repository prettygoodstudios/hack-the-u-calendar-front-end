import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CalendarService } from '../calendar.service';
import { Calendar } from '../calendar';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.css']
})
export class CalendarDetailComponent implements OnInit {
  @Input() calendar: Calendar;

  constructor(private route: ActivatedRoute, private calendarService: CalendarService, private location: Location) { }

  ngOnInit() {
    this.getCalendar();
  }

  getCalendar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.calendarService.getCalendar(id)
      .subscribe(calendar => this.calendar = calendar);
  }
  
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.calendarService.updateCalendar(this.calendar)
      .subscribe(() => this.goBack());
  }
}
