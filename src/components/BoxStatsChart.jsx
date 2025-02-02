import React, { useEffect } from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import { useDispatch , useSelector } from 'react-redux';

import { fetchBoxStats } from '../store/boxStatusSlice';

export default function BoxStatsChart() {
   
    const dispatch = useDispatch();

    const { stats, status, error } = useSelector(state  => state.boxStats);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchBoxStats());
        }
    }, [status, dispatch]);

    if (status === 'loading') return <div>Loading statistics ...</div>;
    if (status ===  'failed') return <div>Error: {error}</div>;

    return (
        <div style={{ height: '350px', width: '100%', marginBottom: '2rem' }}>
            <h4 className="mb-4">Flashcards per Cannon</h4>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis 
                        dataKey="box"
                        interval={0}
                        label={{
                            value: 'Cannon',
                            position: 'insideBottom',
                            offset: -5,
                            margin: 10
                        }}
                    />
                    <YAxis 
                        label={{
                            value: 'Card Count',
                            angle: -90,
                            position: 'insideLeft'
                        }}
                    />
                    <Tooltip/>
                    <Bar 
                        dataKey="count"
                        fill="#C17F59"
                        name="Number of Cards"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}