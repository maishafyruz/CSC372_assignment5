import { useState, useEffect } from 'react'
import SearchForm from './SearchForm'
import ShowList from './ShowList'

function GalleryPage() {
  const [query, setQuery] = useState('Friends')
  const [searchTerm, setSearchTerm] = useState('Friends')
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  function handleSearch() {
    setSearchTerm(query.trim())
  }

  useEffect(() => {
    async function fetchShows() {
      if (searchTerm === '') {
        setShows([])
        setLoading(false)
        setError(null)
        return
      }

      setLoading(true)
      setError(null)
      setShows([])

      try {
        const res = await fetch(
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`
        )

        if (res.status === 429) {
          throw new Error(
            'Too many requests. Please wait a moment and try again.'
          )
        }

        if (!res.ok) {
          throw new Error('Unable to load show results.')
        }

        const data = await res.json()
        setShows(data.slice(0, 10))
      } catch (err) {
        console.error('Failed to load shows', err)
        setError(err.message)
        setShows([])
      }

      setLoading(false)
    }

    fetchShows()
  }, [searchTerm])

  return (
    <main>

      <SearchForm
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      {loading && <p>Loading shows...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <ShowList
          shows={shows}
          searchTerm={searchTerm}
        />
      )}
    </main>
  )
}

export default GalleryPage