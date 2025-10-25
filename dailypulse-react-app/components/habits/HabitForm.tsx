// components/habits/HabitForm.tsx
import React, { useState, useEffect } from "react";
import { Habit, HabitType, HabitCategory } from "../../types";
import { X, Trash2 } from "lucide-react";

interface HabitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Habit) => void;
  onDelete?: (habitId: string) => void;
  habitToEdit?: Habit | null;
}

const categoryOptions = Object.values(HabitCategory);
const colorOptions = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "indigo",
  "pink",
  "gray",
];
const iconOptions = [
  "💧",
  "📚",
  "💪",
  "🧘",
  "💻",
  "🍎",
  "🏃",
  "🎨",
  "🎵",
  "💰",
  "✈️",
  "🏠",
];

const HabitForm: React.FC<HabitFormProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  habitToEdit,
}) => {
  const [habit, setHabit] = useState<Omit<Habit, "id">>({
    name: "",
    icon: "💧",
    category: HabitCategory.Other,
    type: HabitType.Boolean,
    target: 1,
    color: "blue",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (habitToEdit) {
      setHabit(habitToEdit);
    } else {
      setHabit({
        name: "",
        icon: "💧",
        category: HabitCategory.Other,
        type: HabitType.Boolean,
        target: 1,
        color: "blue",
      });
    }
    setShowDeleteConfirm(false);
  }, [habitToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setHabit((prev) => ({
      ...prev,
      [name]: value,
      target:
        name === "type" ? (value === HabitType.Countable ? 2 : 1) : prev.target,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalHabit = {
      ...habit,
      id: habitToEdit?.id || new Date().toISOString(),
    };
    onSave(finalHabit);
  };

  const handleDelete = () => {
    if (habitToEdit && onDelete) {
      onDelete(habitToEdit.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {habitToEdit ? "Edit Habit" : "Create a New Habit"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {!showDeleteConfirm ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={habit.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
                placeholder="Enter habit name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Icon
                </label>
                <select
                  name="icon"
                  value={habit.icon}
                  onChange={handleChange}
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 text-xl text-gray-900 dark:text-white"
                >
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Color
                </label>
                <select
                  name="color"
                  value={habit.color}
                  onChange={handleChange}
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 capitalize text-gray-900 dark:text-white"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={habit.category}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 text-gray-900 dark:text-white"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                name="type"
                value={habit.type}
                onChange={handleChange}
                className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 text-gray-900 dark:text-white"
              >
                <option value={HabitType.Boolean}>Yes/No</option>
                <option value={HabitType.Countable}>Countable</option>
              </select>
            </div>

            {habit.type === HabitType.Countable && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target
                </label>
                <input
                  type="number"
                  name="target"
                  value={habit.target}
                  onChange={handleChange}
                  min="2"
                  required
                  className="w-full bg-gray-100 dark:bg-gray-700 border-transparent rounded-md p-2 text-gray-900 dark:text-white"
                />
              </div>
            )}

            <div className="flex justify-between items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              {habitToEdit && onDelete && (
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="flex items-center px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete
                </button>
              )}
              <div className="flex space-x-3 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {habitToEdit ? "Save Changes" : "Create Habit"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900 mb-4">
                <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Delete Habit
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Are you sure you want to delete <strong>"{habit.name}"</strong>?
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                This action cannot be undone and will remove all associated
                progress data.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors font-semibold"
              >
                Yes, Delete Habit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HabitForm;
