import { Injectable } from '@angular/core';
import { Days } from '../enums/days';
import { CalendarData, Day } from '../interfaces/calendarData';

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

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private year = new Date().getFullYear()
  private month = new Date().getMonth()
  private currentDay = new Date().getDay()
  days: Day[] = []

  daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()
  weekDay = (day: number) => day ? day : 7
  getFirstDayOfMonth = () => this.weekDay(new Date(this.year, this.month, 1).getDay())
  getLastDayOfMonth = () => this.weekDay(new Date(this.year, this.month + 1, 0).getDay())
  getWeekNumber = (year: number, month: number, dayNumber: number) => new Date(year, month, dayNumber).getDay()

  getDays(): CalendarData {
    this.fixCorrectData(this.month)
    console.log(this.month , 'MOOOONTH')
    let firstDayOfLastMonth = this.daysInMonth(this.year, this.month - 1) - (this.getFirstDayOfMonth() - 2)
    for (let i = 1; i < this.getFirstDayOfMonth(); i++) {
      this.days.push({
        dayNumber: firstDayOfLastMonth,
        weekDay: Days[this.weekDay(this.getWeekNumber(this.year, this.month - 1, firstDayOfLastMonth))],
        month: months[this.month - 1],
        year: this.year,
        active: false,
      })
      firstDayOfLastMonth++
    }

    this.days.push({
      dayNumber: 1,
        weekDay: Days[this.weekDay(this.getWeekNumber(this.year, this.month, 1))],
        month: months[this.month],
        year: this.year,
        active: true,
    })

    for (let i = 2; i < this.daysInMonth(this.year, this.month) + 1; i++) {
      this.days.push({
        dayNumber: i,
        weekDay: Days[this.weekDay(this.getWeekNumber(this.year, this.month, i))],
        month: months[this.month],
        year: this.year,
        active: true,
      })
    }
    return {
      days: this.days,
      year: this.year,
      month: this.month
    }
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
