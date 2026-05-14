export interface ScheduleItem {
  day: string;
  date: number;
  title: string;
  time: string;
  location: string;
}

export interface Task {
  id: number;
  title: string;
  course: string;
  dueDate: string;
  color: 'blue' | 'emerald';
}
