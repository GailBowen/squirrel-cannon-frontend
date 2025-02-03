import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoxStats, fetchSubjectBoxStats } from '../store/boxStatusSlice'; 

export default function BoxStatsChart({ subjectId }) { 
    const dispatch = useDispatch();
    const { 
        globalStats, 
        subjectStats,
        globalStatus,
        subjectStatus,
        error 
    } = useSelector(state => state.boxStats);


    const stats = subjectId ? subjectStats : globalStats;
    const status = subjectId ? subjectStatus : globalStatus;

    useEffect(() => {
        if (subjectId) {
            if (subjectStatus === 'idle') {
                dispatch(fetchSubjectBoxStats(subjectId));
            }
        } else {
            if (globalStatus === 'idle') {
                dispatch(fetchBoxStats());
            }
        }
    }, [subjectId, globalStatus, subjectStatus, dispatch]);

    if (status === 'loading') return <div>Loading statistics ...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

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
            <ResponsiveContainer width="100%" height="85%">
                <BarChart 
                    data={stats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    {/* Rest of chart code remains the same */}
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
                    />
                    <YAxis />
                    <Tooltip 
                        cursor={false}
                        content={({ payload }) => {
                            if (!payload || !payload.length) return null;
                            return (
                                <div style={{
                                    backgroundColor: 'white',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '4px'
                                }}>
                                    <p style={{ margin: 0 }}>{payload[0].value}</p>
                                </div>
                            );
                        }}
                    />
                    <Bar 
                        dataKey="count"
                        fill="#C17F59"
                        name="Number of Cards"
                    >
                        <LabelList
                            dataKey="count"
                            position="top"
                            fill="#C17F59"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
