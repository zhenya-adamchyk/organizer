import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Day, Event } from '../interfaces/calendarData';
import { Observable, Subject, map } from 'rxjs';

interface CreateResponse {
  name: String
}
@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private readonly http: HttpClient) { }
  static url = 'https://organizer-9ac18-default-rtdb.europe-west1.firebasedatabase.app/'
  public eventS = new Subject<Event>()

  setEvent(data: Event) {
    this.eventS.next(data)
  }

  createEvent(data: Day, event: Event): Observable<any> {
    return this.http.post<CreateResponse>(`${EventService.url}events/${data.year}-${data.month}-${data.dayNumber}.json`, event).pipe(map((d) => {
      return {...event, id: d.name}
    }))
  }

  removeEvent(data: Day, event: Event): Observable<any> {
    return this.http.delete(`${EventService.url}events/${data.year}-${data.month}-${data.dayNumber}/${event.id}.json`)
  }

  getEvent(day: Day): Observable<any> {
    return this.http.get(`${EventService.url}events/${day.year}-${day.month}-${day.dayNumber}.json`)
  }
  getEvents() {
    return this.http.get(`${EventService.url}events.json`).pipe(map((events) => {
      if (!Object.keys(events).length) return []
      return events
    }))
  }
}
