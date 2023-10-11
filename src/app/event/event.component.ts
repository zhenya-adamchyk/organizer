import { Component, OnDestroy, OnInit } from '@angular/core';
import { Day } from '../interfaces/calendarData';
import { CalendarService } from '../calendar/calendar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  day: Day | undefined
  subscription: Subscription | undefined

  constructor(
    private readonly calendarService: CalendarService
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


}
