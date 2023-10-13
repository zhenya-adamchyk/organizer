import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Day } from '../interfaces/calendarData';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private readonly http: HttpClient) { }
  static url = 'https://organizer-9ac18-default-rtdb.europe-west1.firebasedatabase.app/'

  createEvent(data: Day): Observable<any> {
    return this.http.post(`${EventService.url}events/${data.year}-${data.month}-${data.dayNumber}.json`, data).pipe(map((d) => d))
  }

  removeEvent(data: Day): Observable<any> {
    return this.http.delete(`${EventService.url}events/${data.year}-${data.month}-${data.dayNumber}.json`)
  }

  getEvent(day: Day): Observable<any> {
    return this.http.get(`${EventService.url}events/${day.year}-${day.month}-${day.dayNumber}.json`)
  }
}
