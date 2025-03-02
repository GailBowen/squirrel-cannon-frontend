import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBoxStats = createAsyncThunk(
    'boxStatus/fetchBoxStats',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/box-stats`)
        return response.data;
    }
);

export const fetchBoxStatsToday = createAsyncThunk(
    'boxStatus/fetchBoxStatsToday',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/box-stats/todayOnly=true`)
        return response.data;
    }
);

export const fetchSubjectBoxStats = createAsyncThunk(
    'boxStatus/fetchSubjectBoxStats',
    async (subjectId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/box-stats/${subjectId}`)
        return response.data;
    }
);

export const fetchSubjectBoxStatsToday = createAsyncThunk(
    'boxStatus/fetchSubjectBoxStatsToday',
    async (subjectId) => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/box-stats/${subjectId}?todayOnly=true`)
        return response.data;
    }
);

const boxStatsSlice = createSlice({
    name: 'boxStats',
    initialState: {
        globalStats: [],
        subjectStats: [],
        globalStatus: 'idle',
        subjectStatus: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoxStats.pending, (state) => {
                state.globalStatus = 'loading';
            })
            .addCase(fetchBoxStats.fulfilled, (state, action) => {
                state.globalStatus = 'succeeded';
                state.globalStats = action.payload;
            })
            .addCase(fetchBoxStats.rejected, (state, action) => {
                state.globalStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchBoxStatsToday.pending, (state) => {
                state.globalStatus = 'loading';
            })
            .addCase(fetchBoxStatsToday.fulfilled, (state, action) => {
                state.globalStatus = 'succeeded';
                state.globalStats = action.payload;
            })
            .addCase(fetchBoxStatsToday.rejected, (state, action) => {
                state.globalStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchSubjectBoxStats.pending, (state) => {
                state.subjectStatus = 'loading';
            })
            .addCase(fetchSubjectBoxStats.fulfilled, (state, action) => {
                state.subjectStatus = 'succeeded';
                state.subjectStats = action.payload;
            })
            .addCase(fetchSubjectBoxStats.rejected, (state, action) => {
                state.subjectStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchSubjectBoxStatsToday.pending, (state) => {
                state.subjectStatus = 'loading';
            })
            .addCase(fetchSubjectBoxStatsToday.fulfilled, (state, action) => {
                state.subjectStatus = 'succeeded';
                state.subjectStats = action.payload;
            })
            .addCase(fetchSubjectBoxStatsToday.rejected, (state, action) => {
                state.subjectStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export default boxStatsSlice.reducer;
