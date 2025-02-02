import React, { useEffect } from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

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
        <div style={{ 
            height: '350px', 
            width: '100%', 
            marginBottom: '2rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            padding: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
            <h4 className="mb-4" style={{ paddingLeft: '1rem' }}>Flashcards per Cannon</h4>
            <ResponsiveContainer width="100%" height="80%">
                <BarChart data={stats}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis 
                        dataKey="box"
                        interval={0}
                        tickFormatter={(value) => {
                            const words = {
                                1: 'One',
                                2: 'Two',
                                3: 'Three',
                                4: 'Four',
                                5: 'Five',
                                6: 'Six',
                                7: 'Seven',
                                8: 'Done'
                            };
                            return words[value] || value;
                        }}
                        label={{
                            value: 'Cannons',
                            position: 'bottom',
                            offset: 0,
                            dy: 20
                        }}
                    />
                    <YAxis 
                       
                    />
                    <Tooltip/>
                    <Bar 
                        dataKey="count"
                        fill="#C17F59"
                        name="Number of Cards">

                    <LabelList
                        dataKey="count"
                        position="top"
                        fill="#C17F59"
                        >
                    </LabelList>

                    </Bar>
                        
                    
                   
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}