import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFlashcards = createAsyncThunk('flashcards/fetchFlashcards', async (subjectId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/review/${subjectId}`)
    return response.data
})


export const fetchBoxStats = createAsyncThunk(
    'boxStatus/fetchBoxStats',
    async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/box-stats`)
        return response.data;
    }
);

const boxStatsSlice = createSlice({
    name: 'boxStats',
    initialState: {
        stats: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchBoxStats.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchBoxStats.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.stats = action.payload;
        })
        .addCase(fetchBoxStats.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default boxStatsSlice.reducer;

