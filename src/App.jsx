import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import GalleryPage from './GalleryPage'
import ShowDetail from './ShowDetail'
import './App.css'

function App() {
  return (
    <Router>
      <header>
        <h1>TVmaze Show Gallery</h1>
        <p>Search for TV shows and explore show details.</p>
      </header>

      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path="/shows/:id" element={<ShowDetail />} />
      </Routes>

      <footer>
        <p>
          Show information provided by{' '}
          <a href="https://www.tvmaze.com/" target="_blank">
            TVmaze
          </a>
        </p>
      </footer>
    </Router>
  )
}

export default App