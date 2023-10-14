import { Component, OnDestroy, OnInit } from '@angular/core';
import { Day, Event } from '../interfaces/calendarData';
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
  currentEvent: Event

  myForm : FormGroup = new FormGroup({
    "description": new FormControl(),
    "text": new FormControl(),
    "timeToSend": new FormControl(),
    "amountToRepeat": new FormControl(),
  });

  constructor(
    private readonly calendarService: CalendarService,
    private readonly eventService: EventService,
    private readonly telegramService: TelegramService
  ) {
   }
   ngOnInit(): void {
     this.subscription = this.calendarService.dayS.subscribe(d => {
      this.day = d
      this.currentEvent = this.day.events[0]
      if (this.day.events.length) {
        this.patchForm(this.currentEvent)
      } else {
        this.myForm.reset()
      }
     })
      
    }
    ngOnDestroy(): void {
      this.subscription?.unsubscribe()
    }

    patchForm(event: Event) {
      this.myForm.controls['description'].patchValue(event.description)
      this.myForm.controls['text'].patchValue(event.text)
      this.myForm.controls['timeToSend'].patchValue(event.timeToSend)
      this.myForm.controls['amountToRepeat'].patchValue(event.amountToRepeat)
    }

    removeEvent(): void {
      console.log(this.currentEvent)
      this.eventService.removeEvent(this.day, this.currentEvent).subscribe((d) => {
        this.eventService.setEvent(d)
        this.day.events = this.day.events.filter((e) => e.id !== this.currentEvent.id)
      })
    }

    getEvent(day: Day): void {
      this.eventService.getEvent(day).subscribe((d) => {
        console.log(d, '111111')
      })
    }

    sendM(m: string) {
      this.telegramService.sendM(m).subscribe()
    }

    onSubmit(): void {
      this.eventService.createEvent(this.day, this.myForm.value).subscribe((d)  => {
        this.eventService.setEvent(d)
        console.log(d, 'NEWDAY')
      })
    }

    pickEvent(e: Event) {
      this.currentEvent = e
      this.patchForm(e)
    }
}
