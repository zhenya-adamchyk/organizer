import { Component, OnInit } from '@angular/core';
import { CalendarService, months } from './calendar.service';
import { Days } from '../enums/days';
import { CalendarData, Day } from '../interfaces/calendarData';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public daysData: CalendarData | undefined
  public days = Object.values(Days).filter((d) => typeof d !== 'number')
  public allMonths = months

  constructor(
    private readonly calendarService: CalendarService,
    ) {}

  async ngOnInit(): Promise<void> {
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
    // this.router.navigateByUrl('event')
  }
}
