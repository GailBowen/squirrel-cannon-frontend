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
        <div style={{ height: '400px', width:'100%'}}>
           <h4 className="mb-4">Flashcards in each Cannon</h4>
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
                <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="box"
                            label ={{
                                value:'Cannon Number',
                                position: 'bottom'
                            }}
                    ></XAxis>
                    <YAxis label={{
                        value: 'Card Count',
                        angle: -90,
                        position: 'insideLeft'
                    }}></YAxis>
                    <Tooltip/>
                    <Bar 
                        dataKey="count"
                        fill="#C17F59"
                        name="Number of Cards">
                    </Bar>
                
            </BarChart>
           </ResponsiveContainer>
        </div>
    );
}