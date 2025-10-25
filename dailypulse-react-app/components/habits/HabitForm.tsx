
import React, { useState, useEffect } from 'react';
import { Habit, HabitType, HabitCategory } from '../../types';
import { X } from 'lucide-react';

interface HabitFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (habit: Habit) => void;
    habitToEdit?: Habit | null;
}

const categoryOptions = Object.values(HabitCategory);
const colorOptions = ['blue', 'green', 'red', 'yellow', 'purple', 'indigo', 'pink', 'gray'];
const iconOptions = ['💧', '📚', '💪', '🧘', '💻', '🍎', '🏃', '🎨', '🎵', '💰', '✈️', '🏠'];

const HabitForm: React.FC<HabitFormProps> = ({ isOpen, onClose, onSave, habitToEdit }) => {
    const [habit, setHabit] = useState<Omit<Habit, 'id'>>({
        name: '',
        icon: '💧',
        category: HabitCategory.Other,
        type: HabitType.Boolean,
        target: 1,
        color: 'blue'
    });

    useEffect(() => {
        if (habitToEdit) {
            setHabit(habitToEdit);
        } else {
            setHabit({
                name: '',
                icon: '💧',
                category: HabitCategory.Other,
                type: HabitType.Boolean,
                target: 1,
                color: 'blue'
            });
        }
    }, [habitToEdit, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isCountable = name === 'type' ? value === HabitType.Countable : habit.type === HabitType.Countable;

        setHabit(prev => ({
            ...prev,
            [name]: value,
            target: name === 'type' ? (value === HabitType.Countable ? 2 : 1) : prev.target
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalHabit = {
            ...habit,
            id: habitToEdit?.id || new Date().toISOString()
        };
        onSave(finalHabit);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">{habitToEdit ? 'Edit Habit' : 'Create a New Habit'}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 dark:hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input type="text" name="name" value={habit.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Icon</label>
                            <select name="icon" value={habit.icon} onChange={handleChange} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 text-xl">
                                {iconOptions.map(icon => <option key={icon} value={icon}>{icon}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Color</label>
                            <select name="color" value={habit.color} onChange={handleChange} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 capitalize">
                                {colorOptions.map(color => <option key={color} value={color}>{color}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium">Category</label>
                        <select name="category" value={habit.category} onChange={handleChange} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2">
                            {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Type</label>
                        <select name="type" value={habit.type} onChange={handleChange} className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2">
                            <option value={HabitType.Boolean}>Yes/No</option>
                            <option value={HabitType.Countable}>Countable</option>
                        </select>
                    </div>

                    {habit.type === HabitType.Countable && (
                        <div>
                            <label className="block text-sm font-medium">Target</label>
                            <input type="number" name="target" value={habit.target} onChange={handleChange} min="2" required className="mt-1 block w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2" />
                        </div>
                    )}
                    
                    <div className="flex justify-end space-x-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700">{habitToEdit ? 'Save Changes' : 'Create Habit'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HabitForm;
