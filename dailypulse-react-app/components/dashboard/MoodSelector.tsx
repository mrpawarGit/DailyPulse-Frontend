
import React from 'react';
import type { Mood } from '../../types';

const moods: Mood[] = ['😊', '😐', '😔', '😡', '😴'];

interface MoodSelectorProps {
    currentMood: Mood | null;
    onSelectMood: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ currentMood, onSelectMood }) => {
    return (
        <div className="flex space-x-3 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            {moods.map(mood => (
                <button
                    key={mood}
                    onClick={() => onSelectMood(mood)}
                    className={`text-3xl p-2 rounded-full transition-transform duration-200 ease-in-out ${
                        currentMood === mood
                            ? 'bg-blue-200 dark:bg-blue-800 scale-125'
                            : 'hover:scale-110'
                    }`}
                >
                    {mood}
                </button>
            ))}
        </div>
    );
};

export default MoodSelector;
