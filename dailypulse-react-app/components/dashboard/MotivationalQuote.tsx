
import React, { useState, useEffect } from 'react';
import { fetchQuote } from '../../services/mockApi';

const MotivationalQuote: React.FC = () => {
    const [quote, setQuote] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getQuote = async () => {
            setLoading(true);
            const fetchedQuote = await fetchQuote();
            setQuote(fetchedQuote);
            setLoading(false);
        };
        getQuote();
    }, []);

    return (
        <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">Quote of the Day</h3>
            {loading ? (
                <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
            ) : (
                <p className="text-sm italic text-gray-500 dark:text-gray-400">"{quote}"</p>
            )}
        </div>
    );
};

export default MotivationalQuote;
