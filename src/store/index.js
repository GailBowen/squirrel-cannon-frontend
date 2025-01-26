import { configureStore } from '@reduxjs/toolkit'
import subjectsReducer from './subjectsSlice'
import flashcardsReducer from './flashcardsSlice'

const store = configureStore({
    reducer: {
        subjects: subjectsReducer,
        flashcards: flashcardsReducer,
    },
})

export default store