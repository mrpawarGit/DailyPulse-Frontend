
export type Mood = '😊' | '😐' | '😔' | '😡' | '😴';

export enum HabitType {
  Boolean = 'boolean',
  Countable = 'countable',
}

export enum HabitCategory {
  Health = 'Health',
  Productivity = 'Productivity',
  Mindfulness = 'Mindfulness',
  Fitness = 'Fitness',
  Learning = 'Learning',
  Other = 'Other',
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  category: HabitCategory;
  type: HabitType;
  target: number; // For boolean, it's 1. For countable, it's the target count.
  color: string;
}

export interface HabitProgress {
  [habitId: string]: number; // current progress
}

export interface DailyLog {
  date: string; // YYYY-MM-DD
  mood: Mood | null;
  progress: HabitProgress;
}
