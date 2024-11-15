import { CalendarProps, Views } from 'react-big-calendar'

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color: string;
  approved?: boolean;
}

export interface SlotInfo {
  start: Date;
  end: Date;
  slots: Date[];
  action: 'select' | 'click' | 'doubleClick';
}

export interface CalendarView {
  month: boolean;
  week: boolean;
  day: boolean;
} 