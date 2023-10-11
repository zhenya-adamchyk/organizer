import { Component, OnDestroy, OnInit } from '@angular/core';
import { Day } from '../interfaces/calendarData';
import { CalendarService } from '../calendar/calendar.service';
import { Subscription } from 'rxjs';
import { EventService } from './event.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  day: Day
  subscription: Subscription | undefined

  constructor(
    private readonly calendarService: CalendarService,
    private readonly eventService: EventService,
  ) {
   }
   ngOnInit(): void {
     this.subscription = this.calendarService.dayS.subscribe(d => {
      this.day = d
     })
      
    }
    ngOnDestroy(): void {
      this.subscription?.unsubscribe()
    }

    createEvent(day: Day): void {
      this.eventService.createEvent(day).subscribe()
    }

    removeEvent(day: Day): void {
      this.eventService.removeEvent(day).subscribe()
    }
}
