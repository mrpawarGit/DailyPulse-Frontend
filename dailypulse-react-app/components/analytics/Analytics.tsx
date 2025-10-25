import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Habit, DailyLog, HabitCategory } from '../../types';

interface AnalyticsProps {
    weekData: { date: string; completion: number }[];
    habits: Habit[];
    allLogs: { [date: string]: DailyLog };
}

const Analytics: React.FC<AnalyticsProps> = ({ weekData, habits, allLogs }) => {

    const categoryBreakdown = habits.reduce((acc, habit) => {
        if (!acc[habit.category]) {
            acc[habit.category] = { name: habit.category, count: 0 };
        }
        acc[habit.category].count++;
        return acc;
    }, {} as { [key in HabitCategory]: { name: HabitCategory, count: number } });
    
    const categoryData = Object.values(categoryBreakdown);
    
    // FIX: Explicitly type the accumulator and current value for the reduce function to prevent TypeScript from inferring them as 'unknown'.
    const moodData = Object.values(allLogs).reduce((acc: { mood: string, count: number }[], log: DailyLog) => {
        if (log.mood) {
             const existingEntry = acc.find(item => item.mood === log.mood);
            if (existingEntry) {
                existingEntry.count++;
            } else {
                acc.push({ mood: log.mood, count: 1 });
            }
        }
        return acc;
    }, [] as { mood: string, count: number }[]);


    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Your Analytics</h1>
                <p className="text-gray-500 dark:text-gray-400">Review your progress and find patterns.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Weekly Completion Trend</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={weekData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="date" tick={{ fill: 'currentColor', fontSize: 12 }} />
                            <YAxis unit="%" tick={{ fill: 'currentColor', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    borderColor: 'rgba(128, 128, 128, 0.5)',
                                    color: '#ffffff'
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                 <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Habit Category Breakdown</h2>
                     <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                           <XAxis type="number" tick={{ fill: 'currentColor', fontSize: 12 }} />
                           <YAxis type="category" dataKey="name" tick={{ fill: 'currentColor', fontSize: 12 }} width={80}/>
                           <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    borderColor: 'rgba(128, 128, 128, 0.5)',
                                    color: '#ffffff'
                                }}
                            />
                           <Bar dataKey="count" fill="#8884d8" barSize={20} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md lg:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Mood Tracker</h2>
                    <ResponsiveContainer width="100%" height={300}>
                         <BarChart data={moodData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                             <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                            <XAxis dataKey="mood" tick={{ fontSize: 20 }} />
                            <YAxis allowDecimals={false} tick={{ fill: 'currentColor', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(31, 41, 55, 0.8)',
                                    borderColor: 'rgba(128, 128, 128, 0.5)',
                                    color: '#ffffff'
                                }}
                            />
                            <Bar dataKey="count" fill="#fbbf24" name="Days" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Analytics;