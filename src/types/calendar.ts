export interface Shift {
  id: number;
  title: string;
  start: Date;
  end: Date;
  color: string;
}

export interface NewShift {
  id: number | null;
  title: string;
  start: string;
  end: string;
  color: string;
}

export interface ColorOption {
  value: string;
  label: string;
}

export interface EventStyleGetterProps {
  event: Shift;
  start: Date;
  end: Date;
  isSelected: boolean;
} 