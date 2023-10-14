import { Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService, months } from './calendar.service';
import { Days } from '../enums/days';
import { CalendarData, Day } from '../interfaces/calendarData';
import { EventService } from '../event/event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  public daysData: CalendarData | undefined
  public days = Object.values(Days).filter((d) => typeof d !== 'number')
  public allMonths = months
  subscription: Subscription | undefined
  isMobile: boolean

  constructor(
    private readonly calendarService: CalendarService,
    private readonly eventService: EventService,
    ) {}

  async ngOnInit(): Promise<void> {
    this.isMobile = this.calendarService.isMobile()
    this.eventService.eventS.subscribe(async () => {
      this.daysData = await this.calendarService.getDays()
    })
    this.daysData = await this.calendarService.getDays()
    console.log(this.daysData, 'AAAA')
  }

  async changeMonth(dir: number): Promise<void> {
    this.calendarService.changeMonth(dir)
    this.daysData = await this.calendarService.getDays()
    console.log(this.daysData, 'AAAA')
  }

  openEvent(dayData: Day): void {
    this.calendarService.setDay(dayData)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
