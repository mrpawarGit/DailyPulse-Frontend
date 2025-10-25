
import React from 'react';
import { Habit, HabitType } from '../../types';
import { Edit2 } from 'lucide-react';

interface HabitCardProps {
    habit: Habit;
    progress: number;
    onUpdate: (habitId: string, value: number) => void;
    onEdit: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, progress, onUpdate, onEdit }) => {
    const isCompleted = progress >= habit.target;

    const handleBooleanToggle = () => {
        onUpdate(habit.id, isCompleted ? -1 : 1);
    };

    const colorVariants: { [key: string]: string } = {
        blue: 'border-blue-500',
        indigo: 'border-indigo-500',
        red: 'border-red-500',
        purple: 'border-purple-500',
        green: 'border-green-500',
        yellow: 'border-yellow-500',
        pink: 'border-pink-500',
        gray: 'border-gray-500',
    };

    const bgColorVariants: { [key: string]: string } = {
        blue: 'bg-blue-500',
        indigo: 'bg-indigo-500',
        red: 'bg-red-500',
        purple: 'bg-purple-500',
        green: 'bg-green-500',
        yellow: 'bg-yellow-500',
        pink: 'bg-pink-500',
        gray: 'bg-gray-500',
    }
    
    return (
        <div className={`bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border-l-4 ${colorVariants[habit.color] || 'border-gray-500'} transition-all duration-300 ${isCompleted ? 'opacity-60' : ''}`}>
            <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                    <span className="text-3xl">{habit.icon}</span>
                    <div>
                        <h3 className="font-bold text-lg text-gray-800 dark:text-white">{habit.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{habit.category}</p>
                    </div>
                </div>
                 <button onClick={onEdit} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <Edit2 size={16} />
                </button>
            </div>
            
            <div className="mt-4">
                {habit.type === HabitType.Countable && (
                    <div className="flex items-center space-x-3">
                        <button onClick={() => onUpdate(habit.id, -1)} className="bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">-</button>
                        <div className="flex-1 text-center">
                            <span className="font-bold text-xl">{progress}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400"> / {habit.target}</span>
                        </div>
                        <button onClick={() => onUpdate(habit.id, 1)} className="bg-gray-200 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">+</button>
                    </div>
                )}
                {habit.type === HabitType.Boolean && (
                    <button 
                        onClick={handleBooleanToggle}
                        className={`w-full py-2 rounded-lg font-semibold text-white transition-colors ${isCompleted ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
                    >
                        {isCompleted ? 'Completed!' : 'Mark as Done'}
                    </button>
                )}
            </div>
            
            {habit.type === HabitType.Countable && (
                 <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-4">
                    <div 
                        className={`${bgColorVariants[habit.color] || 'bg-gray-600'} h-2.5 rounded-full transition-all duration-500`} 
                        style={{width: `${(progress / habit.target) * 100}%`}}>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HabitCard;
