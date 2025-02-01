import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchFlashcards = createAsyncThunk('flashcards/fetchFlashcards', async (subjectId) => {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/flashcard/review/${subjectId}`)
    return response.data
})

export const reviewCard = createAsyncThunk('flashcards/reviewCard', async ({ id, correct }) => {
    await axios.post('${import.meta.env.VITE_API_BASE_URL}/api/flashcard/review', { id, correct })
    return { id, correct }
})

export const createFlashcard = createAsyncThunk('flashcards/createFlashcard', async (flashcardData) => {
    const response = await axios.post('${import.meta.env.VITE_API_BASE_URL}/api/flashcard', flashcardData)
    return response.data
})

const flashcardsSlice = createSlice({
    name: 'flashcards',
    initialState: { flashcards: [], currentCardIndex: 0, status: 'idle', error: null },
    reducers: {
        nextCard: (state) => {
            state.currentCardIndex = (state.currentCardIndex + 1) % state.flashcards.length
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFlashcards.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchFlashcards.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.flashcards = action.payload
                state.currentCardIndex = 0
            })
            .addCase(fetchFlashcards.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(reviewCard.fulfilled, (state, action) => {
                const { id, correct } = action.payload
                const card = state.flashcards.find(card => card.id === id)
                if (card) {
                    card.box = correct ? Math.min(card.box + 1, 5) : 1
                    card.lastReview = new Date().toISOString()
                }
            })
            .addCase(createFlashcard.fulfilled, (state, action) => {
                state.flashcards.push(action.payload)
            })
    },
})

export const { nextCard } = flashcardsSlice.actions
export default flashcardsSlice.reducer
