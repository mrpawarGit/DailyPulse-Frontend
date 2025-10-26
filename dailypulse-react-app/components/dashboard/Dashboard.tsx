import React from "react";
import type { Habit, DailyLog, Mood } from "../../types";
import HabitCard from "../habits/HabitCard";
import MoodSelector from "./MoodSelector";
import ProgressRing from "./ProgressRing";
import StreakCounter from "./StreakCounter";
import MotivationalQuote from "./MotivationalQuote";

interface DashboardProps {
  habits: Habit[];
  todayLog: DailyLog;
  streak: number;
  updateHabitProgress: (habitId: string, value: number) => void;
  setMoodForToday: (mood: Mood) => void;
  onEditHabit: (habit: Habit) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  habits,
  todayLog,
  streak,
  updateHabitProgress,
  setMoodForToday,
  onEditHabit,
}) => {
  const totalHabits = habits.length;
  const completedHabits = habits.reduce((acc, habit) => {
    const progress = todayLog.progress[habit.id] || 0;
    return acc + (progress >= habit.target ? 1 : 0);
  }, 0);
  const completionPercentage =
    totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Today's Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Keep up the great work!
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Today's Progress
          </h3>
          <ProgressRing percentage={completionPercentage} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">
            Current Streak
          </h3>
          <StreakCounter streak={streak} />
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
            How are you feeling?
          </h3>
          <MoodSelector
            currentMood={todayLog.mood}
            onSelectMood={setMoodForToday}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex flex-col items-center justify-center">
          <MotivationalQuote />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
          Your Habits
        </h2>
        {habits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                progress={todayLog.progress[habit.id] || 0}
                onUpdate={updateHabitProgress}
                onEdit={() => onEditHabit(habit)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <p className="text-gray-500 dark:text-gray-400">
              No habits yet. Click 'Add Habit' to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
