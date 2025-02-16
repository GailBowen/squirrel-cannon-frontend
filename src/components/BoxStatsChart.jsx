import React, { useEffect, useState } from 'react';
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

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        <div
            className="chart-container"
            style={{
                height: isMobile ? '350px' : '500px',
                width: '100%',
                marginBottom: '2rem',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '1rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
        >
            <h4 className="mb-4" style={{ paddingLeft: '1rem' }}>Flashcards per Cannon</h4>
            <ResponsiveContainer width="100%" aspect={isMobile ? 1.5 : 2.5}>
                <BarChart
                    data={stats}
                    margin={{ top: 20, right: 30, left: 20, bottom: isMobile ? 40 : 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="box"
                        interval={0}
                        angle={isMobile ? -45 : 0} // Diagonal labels for mobile; horizontal for desktop
                        textAnchor={isMobile ? "end" : "middle"}
                        tick={{ fontSize: isMobile ? 12 : 14 }}
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
                                    padding: '4px',
                                    fontSize: '12px',
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
                            style={{ fontSize: isMobile ? "10px" : "12px" }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
