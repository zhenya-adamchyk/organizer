import { Injectable } from '@angular/core';
import { Days } from '../enums/days';
import { CalendarData, Day } from '../interfaces/calendarData';
import { Subject } from 'rxjs';
import { EventService } from '../event/event.service';

export const months = [
  'January',
  'February ',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

@Injectable({ providedIn: 'root' })
export class CalendarService {
  constructor(private readonly eventsService: EventService) {}
  private year = new Date().getFullYear()
  private month = new Date().getMonth()
  public dayS = new Subject<Day>()
  public days: Day[] = []

  daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  weekDay = (day: number) => day ? day : 7
  getFirstDayOfMonth = () => this.weekDay(new Date(this.year, this.month, 1).getDay())
  getLastDayOfMonth = () => this.weekDay(new Date(this.year, this.month + 1, 0).getDay())
  getWeekNumber = (year: number, month: number, dayNumber: number) => new Date(year, month, dayNumber).getDay()

  setDay(data: Day) {
    this.dayS.next(data)
  }

  async getDays(): Promise<CalendarData> {
    this.days = []
    this.fixCorrectData(this.month)
    console.log(this.month , 'MOOOONTH')
    console.log(new Date().getDate() , 'weekDay')
    let firstDayOfLastMonth = this.daysInMonth(this.year, this.month - 1) - (this.getFirstDayOfMonth() - 2)
    this.eventsService.getEvents().subscribe((res) => {
      console.log(res, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAa')

      for (let i = 1; i < this.getFirstDayOfMonth(); i++) {
        this.pushDay(1, firstDayOfLastMonth, this.convert(res[`${this.year}-${months[this.month - 1]}-${firstDayOfLastMonth}`]))
        firstDayOfLastMonth++
      }
  
      this.pushDay(0, 1, this.convert(res[`${this.year}-${months[this.month]}-1`]))
  
      for (let i = 2; i < this.daysInMonth(this.year, this.month) + 1; i++) {
        this.pushDay(0, i, this.convert(res[`${this.year}-${months[this.month]}-${i}`]) || [])
      }
    })
    return {
      days: this.days,
      year: this.year,
      month: this.month
    }
  }

  convert(events: any) {
    return Object.keys(events || {}).map(k => ({...events[k], id: k}))
  }

  pushDay(monthDif: number, day: number, events: any): void {
    this.days.push({
      dayNumber: day,
      weekDay: Days[this.weekDay(this.getWeekNumber(this.year, this.month - monthDif, day))],
      month: months[this.month - monthDif],
      year: this.year,
      active: true,
      current: this.checkCurrentDay(day),
      events: events || [],
    })
  }

  checkCurrentDay(weekDay: number) {
    return this.year === new Date().getFullYear() && new Date().getDate() === weekDay && new Date().getMonth() === this.month
  }

  changeMonth(dir: number) {
    this.days = []
    !dir ? this.month-- : this.month++
  }

  fixCorrectData(monthNumber: number) {
      if (monthNumber < 0) {
        this.month = 11
        this.year--
      } else if (this.month === 12) {
        this.month = 0
        this.year++
      }
  }
}
