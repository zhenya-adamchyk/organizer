import { Component, OnInit } from '@angular/core';
import { CalendarService, months } from './calendar.service';
import { Days } from '../enums/days';
import { CalendarData } from '../interfaces/calendarData';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public daysData: CalendarData | undefined
  public days = Object.values(Days).filter((d) => typeof d !== 'number')
  public allMonths = months

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.daysData = this.calendarService.getDays()
  }

  changeMonth(dir: number) {
    this.calendarService.changeMonth(dir)
    this.daysData = this.calendarService.getDays()
    console.log(this.daysData, 'AAAA')
  }
}
