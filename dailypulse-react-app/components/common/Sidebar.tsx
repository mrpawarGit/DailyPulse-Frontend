import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, LayoutDashboard, BarChart3, PlusCircle, LogOut } from 'lucide-react';

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    onAddHabit: () => void;
    onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onAddHabit, onLogout }) => {
    const { theme, toggleTheme } = useTheme();

    const NavItem = ({ view, icon, label, onClick }: { view?: string, icon: React.ReactNode, label: string, onClick?: () => void }) => (
        <button
            onClick={onClick || (() => setActiveView(view!))}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                activeView === view
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
            {icon}
            <span className="ml-3 hidden lg:block">{label}</span>
        </button>
    );

    return (
        <aside className="flex flex-col w-16 lg:w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 transition-width duration-300">
            <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <h1 className="text-xl font-bold ml-3 hidden lg:block text-gray-800 dark:text-white">DailyPulse</h1>
            </div>

            <nav className="flex flex-col space-y-2">
                <NavItem view="dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                <NavItem view="analytics" icon={<BarChart3 size={20} />} label="Analytics" />
            </nav>

            <button
                onClick={onAddHabit}
                className="flex items-center justify-center lg:justify-start w-full px-4 py-3 mt-8 text-sm font-medium rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
                <PlusCircle size={20} />
                <span className="ml-3 hidden lg:block">Add Habit</span>
            </button>


            <div className="mt-auto">
                 <NavItem
                    onClick={onLogout}
                    icon={<LogOut size={20} />}
                    label="Logout"
                />
                 <div className="my-2 border-t border-gray-200 dark:border-gray-700"></div>
                <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center lg:justify-start w-full p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                    {theme === 'light' ? <Moon className="text-gray-600" size={20} /> : <Sun className="text-yellow-400" size={20} />}
                    <span className="ml-3 hidden lg:block text-sm font-medium text-gray-600 dark:text-gray-300">
                        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                </button>
            </div>
        </aside>
    );
};