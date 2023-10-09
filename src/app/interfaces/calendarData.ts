export interface Day {
    dayNumber: number
    weekDay: string
    month: string
    year: number
    active: boolean
    current?: boolean
}

export interface CalendarData {
    days: Day[],
    year: number,
    month: number
}