import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Calendar } from './calendar';
import { CALENDARS } from './mock-calendar';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient, private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json' })
  }

  getCalendars(): Observable<Calendar[]> {
    this.messageService.add('CalendarService: fetched calendars');
    return this.http.get<Calendar[]>(this.calendarUrl)
      .pipe(tap(_ => this.log('fetched calendars')), catchError(this.handleError<Calendar[]>('getCalendars', [])));
  }

  /** GET calendar by id. Will 404 if id not found */
  getCalendar(id: number): Observable<Calendar> {
    const url = `${this.calendarUrl}/${id}`;
    return this.http.get<Calendar>(url)
      .pipe(tap(_ => this.log(`fetched hero id=${id}`)), catchError(this.handleError<Calendar>(`getCalendar id=${id}`)));
  }

  /** GET calendars whose name contains search term */
  searchCalendars(term: string): Observable<Calendar[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Calendar[]>(`${this.calendarUrl}/?name=${term}`)
      .pipe(tap(_ => this.log(`found calendars matching "${term}"`)), catchError(this.handleError<Calendar[]>('searchCalendars', [])));
  }

  /** PUT: update the calendar on the server */
  updateCalendar (calendar: Calendar): Observable<any> {
    return this.http.put(this.calendarUrl, calendar, this.httpOptions)
      .pipe(tap(_ => this.log(`updated hero id=${calendar.id}`)), catchError(this.handleError<any>('updateCalendar')));
  }

  /** POST: add a new calendar to the server */
  addCalendar (calendar: Calendar): Observable<Calendar> {
    return this.http.post<Calendar>(this.calendarUrl, calendar, this.httpOptions)
      .pipe(tap((newCalendar: Calendar) => this.log(`added calendar w/id=${newCalendar.id}`)), catchError(this.handleError<Calendar>('addCalendar')));
  }

  /** DELETE: delete the calendar from the server */
  deleteCalendar (calendar: Calendar | number): Observable<Calendar> {
    const id = typeof calendar === 'number' ? calendar : calendar.id;
    const url = `${this.calendarUrl}/${id}`;

    return this.http.delete<Calendar>(url, this.httpOptions)
      .pipe(tap(_ => this.log(`deleted calendar id=${id}`)), catchError(this.handleError<Calendar>('deleteCalendar')));
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  private calendarUrl = 'api/calendars'; // URL to web api

  /** Log a calendarService message with the messageService */
  private log(message: string) {
    this.messageService.add(`CalendarService: ${message}`);
  }
}
