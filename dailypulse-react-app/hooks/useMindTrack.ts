
import { useState, useEffect, useCallback } from 'react';
import { format, subDays, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { fetchHabits, fetchQuote, saveHabitsAndLogs } from '../services/mockApi';
import type { Habit, DailyLog, Mood, HabitProgress } from '../types';

interface DailyPulseState {
    habits: Habit[];
    logs: { [date: string]: DailyLog };
    currentDate: string;
    streak: number;
    isLoading: boolean;
}

const formatDate = (date: Date): string => format(date, 'yyyy-MM-dd');

export const useDailyPulse = () => {
    const [state, setState] = useState<DailyPulseState>({
        habits: [],
        logs: {},
        currentDate: formatDate(new Date()),
        streak: 0,
        isLoading: true,
    });

    const calculateStreak = useCallback((logs: { [date: string]: DailyLog }, habits: Habit[]): number => {
        let streak = 0;
        let currentDate = new Date();

        while (true) {
            const dateStr = formatDate(currentDate);
            const log = logs[dateStr];

            if (!log || habits.length === 0) {
                break;
            }

            const allHabitsCompleted = habits.every(habit => (log.progress[habit.id] || 0) >= habit.target);
            
            if (allHabitsCompleted) {
                streak++;
                currentDate = subDays(currentDate, 1);
            } else {
                break;
            }
        }
        return streak;
    }, []);
    
    useEffect(() => {
        const loadInitialData = async () => {
            const { habits, logs } = await fetchHabits();
            const streak = calculateStreak(logs, habits);
            setState({
                habits,
                logs,
                currentDate: formatDate(new Date()),
                streak,
                isLoading: false,
            });
        };
        loadInitialData();
    }, [calculateStreak]);

    useEffect(() => {
      if (!state.isLoading) {
        saveHabitsAndLogs(state.habits, state.logs);
      }
    }, [state.habits, state.logs, state.isLoading]);


    const getTodayLog = useCallback(() => {
        return state.logs[state.currentDate] || { date: state.currentDate, mood: null, progress: {} };
    }, [state.logs, state.currentDate]);

    const updateLog = (date: string, newProgress: HabitProgress, newMood: Mood | null) => {
        setState(prevState => {
            const existingLog = prevState.logs[date] || { date, mood: null, progress: {} };
            const updatedLog = {
                ...existingLog,
                progress: { ...existingLog.progress, ...newProgress },
                mood: newMood !== undefined ? newMood : existingLog.mood,
            };
            const newLogs = { ...prevState.logs, [date]: updatedLog };
            const newStreak = calculateStreak(newLogs, prevState.habits);
            return {
                ...prevState,
                logs: newLogs,
                streak: newStreak
            };
        });
    };
    
    const addHabit = (habit: Habit) => {
        setState(prevState => {
            const isEditing = prevState.habits.some(h => h.id === habit.id);
            const newHabits = isEditing
                ? prevState.habits.map(h => h.id === habit.id ? habit : h)
                : [...prevState.habits, habit];
            
            return {
                ...prevState,
                habits: newHabits,
            };
        });
    };

    const updateHabitProgress = (habitId: string, value: number) => {
        const habit = state.habits.find(h => h.id === habitId);
        if (!habit) return;
        
        const todayLog = getTodayLog();
        const currentProgress = todayLog.progress[habitId] || 0;
        let newProgress = currentProgress + value;
        
        if (newProgress < 0) newProgress = 0;
        if (newProgress > habit.target) newProgress = habit.target;

        updateLog(state.currentDate, { [habitId]: newProgress }, todayLog.mood);
    };

    const setMoodForToday = (mood: Mood) => {
        const todayLog = getTodayLog();
        updateLog(state.currentDate, {}, mood);
    };

    const getWeekData = useCallback((date: Date) => {
        const start = startOfWeek(date, { weekStartsOn: 1 });
        const end = endOfWeek(date, { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end }).map(day => {
            const dateStr = formatDate(day);
            const log = state.logs[dateStr];
            const totalHabits = state.habits.length;
            if (!log || totalHabits === 0) {
                return { date: format(day, 'EEE'), completion: 0 };
            }

            const completedCount = state.habits.reduce((acc, habit) => {
                const progress = log.progress[habit.id] || 0;
                return acc + (progress >= habit.target ? 1 : 0);
            }, 0);
            
            return {
                date: format(day, 'EEE'),
                completion: Math.round((completedCount / totalHabits) * 100)
            };
        });
    }, [state.logs, state.habits]);
    
    return { state, addHabit, updateHabitProgress, setMoodForToday, getTodayLog, getWeekData, fetchQuote };
};