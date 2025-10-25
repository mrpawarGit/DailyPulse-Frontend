
import React from 'react';

interface StreakCounterProps {
    streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
    return (
        <div className="flex items-center space-x-2">
            <span className="text-6xl text-orange-500">🔥</span>
            <div>
                <p className="text-4xl font-bold text-gray-800 dark:text-white">{streak}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">day streak</p>
            </div>
        </div>
    );
};

export default StreakCounter;
