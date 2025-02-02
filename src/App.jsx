import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Home from './components/Home'
import SubjectList from './components/SubjectList'
import FlashcardReview from './components/FlashcardReview'
import CreateFlashcard from './components/CreateFlashcard'

function App() {
  return (
    <Router>
      <div>
        <header>
          <nav className="navbar navbar-expand-sm navbar-light bg-white">
            <div className="container">
              <Link className="navbar-brand" to="/">Squirrel Cannon</Link>
              <div className="navbar-collapse collapse">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subjects" element={<SubjectList />} />
            <Route path="/review/:subjectId" element={<FlashcardReview />} />
            <Route path="/create" element={<CreateFlashcard />} />
          </Routes>
        </main>

        <footer className="footer text-muted" style={{ marginTop: '0', paddingTop: '5' }}>
          <div className="container">
            &copy; {new Date().getFullYear()} - The Squirrel Cannon
          </div>
        </footer>

      </div>
    </Router>
  )
}

export default App
