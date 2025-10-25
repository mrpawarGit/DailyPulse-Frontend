
import { Habit, DailyLog, HabitType, HabitCategory } from '../types';

const MOCK_HABITS: Habit[] = [
    { id: '1', name: 'Drink Water', icon: '💧', category: HabitCategory.Health, type: HabitType.Countable, target: 8, color: 'blue' },
    { id: '2', name: 'Read a Book', icon: '📚', category: HabitCategory.Learning, type: HabitType.Boolean, target: 1, color: 'indigo' },
    { id: '3', name: 'Workout', icon: '💪', category: HabitCategory.Fitness, type: HabitType.Boolean, target: 1, color: 'red' },
    { id: '4', name: 'Meditate', icon: '🧘', category: HabitCategory.Mindfulness, type: HabitType.Boolean, target: 1, color: 'purple' },
    { id: '5', name: 'Code for 1 hour', icon: '💻', category: HabitCategory.Productivity, type: HabitType.Boolean, target: 1, color: 'green' },
];

const MOCK_QUOTES = [
    "The secret of getting ahead is getting started.",
    "Well done is better than well said.",
    "The journey of a thousand miles begins with a single step.",
    "It does not matter how slowly you go as long as you do not stop.",
    "Believe you can and you're halfway there."
];

const HABITS_STORAGE_KEY = 'dailypulse_habits';
const LOGS_STORAGE_KEY = 'dailypulse_logs';

export const fetchHabits = (): Promise<{ habits: Habit[]; logs: { [date: string]: DailyLog } }> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const storedHabits = localStorage.getItem(HABITS_STORAGE_KEY);
            const storedLogs = localStorage.getItem(LOGS_STORAGE_KEY);
            
            const habits = storedHabits ? JSON.parse(storedHabits) : MOCK_HABITS;
            const logs = storedLogs ? JSON.parse(storedLogs) : {};

            resolve({ habits, logs });
        }, 500);
    });
};

export const saveHabitsAndLogs = (habits: Habit[], logs: { [date: string]: DailyLog }): Promise<void> => {
     return new Promise(resolve => {
        localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
        localStorage.setItem(LOGS_STORAGE_KEY, JSON.stringify(logs));
        resolve();
    });
}

export const fetchQuote = (): Promise<string> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * MOCK_QUOTES.length);
            resolve(MOCK_QUOTES[randomIndex]);
        }, 300);
    });
};