import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async () => {
    const response = await axios.get('https://localhost:44363/api/subjects')
    return response.data
})

const subjectsSlice = createSlice({
    name: 'subjects',
    initialState: { subjects: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubjects.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchSubjects.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.subjects = action.payload
            })
            .addCase(fetchSubjects.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default subjectsSlice.reducer
