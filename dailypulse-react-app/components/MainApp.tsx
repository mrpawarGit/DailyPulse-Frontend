// components/MainApp.tsx
import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDailyPulse } from "../hooks/useMindTrack";
import Dashboard from "./dashboard/Dashboard";
import Analytics from "./analytics/Analytics";
import { useTheme } from "../context/ThemeContext";
import { Sidebar } from "./common/Sidebar";
import { Habit } from "../types";
import HabitForm from "./habits/HabitForm";
import LoadingSpinner from "./common/LoadingSpinner";

const MainApp: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state,
    addHabit,
    deleteHabit,
    updateHabitProgress,
    setMoodForToday,
    getTodayLog,
    getWeekData,
  } = useDailyPulse();
  const { theme } = useTheme();
  const [isHabitFormOpen, setIsHabitFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const activeView = location.pathname.includes("analytics")
    ? "analytics"
    : "dashboard";

  const todayLog = useMemo(getTodayLog, [
    state.logs,
    state.currentDate,
    getTodayLog,
  ]);
  const weekData = useMemo(
    () => getWeekData(new Date()),
    [state.logs, getWeekData]
  );

  const handleAddHabitClick = () => {
    setEditingHabit(null);
    setIsHabitFormOpen(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsHabitFormOpen(true);
  };

  const handleSaveHabit = (habit: Habit) => {
    addHabit(habit);
    setIsHabitFormOpen(false);
    setEditingHabit(null);
  };

  const handleDeleteHabit = (habitId: string) => {
    deleteHabit(habitId);
    setIsHabitFormOpen(false);
    setEditingHabit(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const setActiveView = (view: string) => {
    navigate(`/${view}`);
  };

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className={`flex h-screen font-sans antialiased text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-white ${theme}`}
    >
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onAddHabit={handleAddHabitClick}
        onLogout={handleLogout}
      />
      <main className="flex-1 p-4 pt-20 sm:p-6 lg:p-8 lg:pt-8 overflow-y-auto">
        {activeView === "dashboard" && (
          <Dashboard
            habits={state.habits}
            todayLog={todayLog}
            streak={state.streak}
            updateHabitProgress={updateHabitProgress}
            setMoodForToday={setMoodForToday}
            onEditHabit={handleEditHabit}
          />
        )}
        {activeView === "analytics" && (
          <Analytics
            weekData={weekData}
            habits={state.habits}
            allLogs={state.logs}
          />
        )}
      </main>
      {isHabitFormOpen && (
        <HabitForm
          isOpen={isHabitFormOpen}
          onClose={() => setIsHabitFormOpen(false)}
          onSave={handleSaveHabit}
          onDelete={handleDeleteHabit}
          habitToEdit={editingHabit}
        />
      )}
    </div>
  );
};

export default MainApp;
