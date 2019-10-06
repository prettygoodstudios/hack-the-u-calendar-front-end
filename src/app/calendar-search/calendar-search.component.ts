import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Calendar } from '../calendar';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-search',
  templateUrl: './calendar-search.component.html',
  styleUrls: ['./calendar-search.component.css']
})

export class CalendarSearchComponent implements OnInit {
  calendars$: Observable<Calendar[]>;
  private searchTerms = new Subject<string>();

  constructor(private calendarService: CalendarService) {}

  // Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.calendars$ = this.searchTerms.pipe(debounceTime(300), distinctUntilChanged(), switchMap((term: string) => this.calendarService.searchCalendars(term)));
  }
}
