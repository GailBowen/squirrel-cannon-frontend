import { configureStore } from '@reduxjs/toolkit'
import subjectsReducer from './subjectsSlice'
import flashcardsReducer from './flashcardsSlice'
import boxStatsReducer from './boxStatusSlice'

const store = configureStore({
    reducer: {
        subjects: subjectsReducer,
        flashcards: flashcardsReducer,
        boxStats: boxStatsReducer
    },
})

export default store