
import React from 'react';

interface ProgressRingProps {
    percentage: number;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ percentage }) => {
    const radius = 50;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative inline-block">
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                <circle
                    stroke="currentColor"
                    className="text-gray-200 dark:text-gray-600"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="currentColor"
                    className="text-blue-600"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.35s' }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {percentage}%
                </span>
            </div>
        </div>
    );
};

export default ProgressRing;
