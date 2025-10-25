import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  PlusCircle,
  LogOut,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onAddHabit: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onAddHabit,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavItem = ({
    view,
    icon,
    label,
    onClick,
  }: {
    view?: string;
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
  }) => (
    <button
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          setActiveView(view!);
        }
        setIsOpen(false); // Close mobile menu after click
      }}
      className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
        activeView === view
          ? "bg-blue-600 text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
      <span className="ml-3">{label}</span>
    </button>
  );

  return (
    <>
      {/* Mobile-only Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile - only visible when menu is open */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - Hidden on mobile unless opened, always visible on desktop */}
      <aside
        className={`
                    fixed lg:relative
                    top-0 left-0
                    h-full
                    bg-white dark:bg-gray-800
                    border-r border-gray-200 dark:border-gray-700
                    transition-all duration-300 ease-in-out
                    z-40
                    ${
                      isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                    }
                    w-64
                    flex flex-col
                    p-4
                `}
      >
        {/* Logo */}
        <div className="flex items-center justify-start mb-8 mt-16 lg:mt-0">
          <div className="bg-blue-600 p-2 rounded-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold ml-3 text-gray-800 dark:text-white">
            DailyPulse
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          <NavItem
            view="dashboard"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
          />
          <NavItem
            view="analytics"
            icon={<BarChart3 size={20} />}
            label="Analytics"
          />
        </nav>

        {/* Add Habit Button */}
        <button
          onClick={() => {
            onAddHabit();
            setIsOpen(false);
          }}
          className="flex items-center justify-start w-full px-4 py-3 mt-8 text-sm font-medium rounded-lg transition-colors duration-200 text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle size={20} />
          <span className="ml-3">Add Habit</span>
        </button>

        {/* Logout */}
        <div className="mt-auto">
          <NavItem
            onClick={onLogout}
            icon={<LogOut size={20} />}
            label="Logout"
          />
        </div>
      </aside>
    </>
  );
};
