import React, { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  PlusCircle,
  LogOut,
  Menu,
  X,
  User,
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

  // Get user data from localStorage
  const getUserName = () => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        // Return first name only
        return user.name.split(" ")[0];
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return "User";
  };

  const userName = getUserName();

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
        setIsOpen(false);
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

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
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

        {/* User Profile & Logout Section */}
        <div className="mt-auto space-y-2">
          {/* User Info Card */}
          <div className="px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              {/* stylized profile avatar */}
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
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
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  My Account
                </p>
              </div>
            </div>
          </div>

          {/* Logout Button */}
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
