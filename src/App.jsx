import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import SubjectList from './components/SubjectList'
import FlashcardReview from './components/FlashcardReview'
import CreateFlashcard from './components/CreateFlashcard'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subjects" element={<SubjectList />} />
        <Route path="/review/:subjectId" element={<FlashcardReview />} />
        <Route path="/create" element={<CreateFlashcard />} />
      </Routes>
    </Router>
  )

}

export default App
