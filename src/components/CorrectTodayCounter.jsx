import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const CORRECT_COUNT_URL = `${import.meta.env.VITE_API_BASE_URL}/api/Flashcard/today/correct-count`;

const CorrectTodayCounter = forwardRef((props, ref) => {
    const [count, setCount] = useState(0);

    const fetchCount = async () => {
        try {
            const response = await fetch(CORRECT_COUNT_URL);
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setCount(data);
        } catch (err) {
            setCount('—');
        }
    };

    useEffect(() => {
        fetchCount();
    }, []);

    useImperativeHandle(ref, () => ({
        refresh: fetchCount
    }));

    return (
        <div style={{ fontWeight: 'bold', margin: '1em 0' }}>
            Correct answers today: {count}
        </div>
    );
});

export default CorrectTodayCounter;
