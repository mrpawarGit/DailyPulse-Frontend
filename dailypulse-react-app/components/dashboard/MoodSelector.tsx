import React from "react";
import type { Mood } from "../../types";

const moods: Mood[] = ["😊", "😐", "😔", "😡", "😴"];

interface MoodSelectorProps {
  currentMood: Mood | null;
  onSelectMood: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({
  currentMood,
  onSelectMood,
}) => {
  return (
    <div className="inline-flex flex-wrap sm:flex-nowrap justify-center gap-1.5 sm:gap-1 bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
      {moods.map((mood) => (
        <button
          key={mood}
          onClick={() => onSelectMood(mood)}
          className={`text-xl sm:text-2xl p-1.5 sm:p-2 rounded-full transition-transform duration-200 ease-in-out ${
            currentMood === mood
              ? "bg-blue-200 dark:bg-blue-800 scale-110"
              : "hover:scale-105"
          }`}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
