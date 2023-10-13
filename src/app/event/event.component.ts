import { Component, OnDestroy, OnInit } from '@angular/core';
import { Day } from '../interfaces/calendarData';
import { CalendarService } from '../calendar/calendar.service';
import { Subscription } from 'rxjs';
import { EventService } from './event.service';
import { TelegramService } from '../telegram.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {
  day: Day
  subscription: Subscription | undefined

  myForm : FormGroup

  constructor(
    private readonly calendarService: CalendarService,
    private readonly eventService: EventService,
    private readonly telegramService: TelegramService
  ) {
   }
   ngOnInit(): void {
    this.myForm = new FormGroup({
      "description": new FormControl(),
      "text": new FormControl(),
      "timeToSend": new FormControl(),
      "amountToRepeat": new FormControl(),
    });
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

    getEvent(day: Day): void {
      this.eventService.getEvent(day).subscribe((d) => {
        console.log(d, '111111')
      })
    }

    sendM(m: string) {
      this.telegramService.sendM(m).subscribe()
    }
}
