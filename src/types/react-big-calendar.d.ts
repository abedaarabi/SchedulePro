declare module 'react-big-calendar' {
  import * as React from 'react'

  export interface Event {
    title: string
    start: Date
    end: Date
    [key: string]: any
  }

  export interface CalendarProps {
    localizer: any
    events: Event[]
    startAccessor: string
    endAccessor: string
    style: React.CSSProperties
    views: string[]
    eventPropGetter?: (event: Event) => React.CSSProperties
    selectable?: boolean
    onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void
    onSelectEvent?: (event: Event) => void
    className?: string
  }

  export class Calendar extends React.Component<CalendarProps> {}
  export const momentLocalizer: (moment: any) => any
  export const Views: { MONTH: string; WEEK: string; DAY: string }
} 