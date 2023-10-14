export interface Day {
    id?: String
    dayNumber: number
    weekDay: string
    month: string
    year: number
    active: boolean
    current?: boolean
    events: Event[]
}

export interface CalendarData {
    days: Day[],
    year: number,
    month: number
}

export interface Event {
    description?: String
    text: String
    active: boolean
    overdue: boolean
    timeToSend: any
    amountToRepeat: number
    id?: String
}