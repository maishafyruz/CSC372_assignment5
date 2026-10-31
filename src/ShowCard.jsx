import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { stripHtml, formatDate } from './utils'

function ShowCard({ show }) {
  const [cast, setCast] = useState([])
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState(null)

  let summary = 'Not available'

  if (show.summary) {
    summary = stripHtml(show.summary)

    if (summary.length > 200) {
      summary = summary.slice(0, 200) + '...'
    }
  }

  useEffect(() => {
    async function fetchCast() {
      setCastLoading(true)
      setCastError(null)

      try {
        const res = await fetch(
          `https://api.tvmaze.com/shows/${show.id}/cast`
        )

        if (res.status === 429) {
            throw new Error('Too many requests.')
        }

        if (!res.ok) {
        throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()
        setCast(data.slice(0, 3))

        } catch (err) {
        console.error('Failed to load cast', err)

        if (err.message === 'Too many requests.') {
        setCastError('Too many requests. Please try again shortly.')
        } else {
        setCastError('Cast: Not available')
        }

        setCast([])
        }

      setCastLoading(false)
    }

    fetchCast()
  }, [show.id])

  return (
    <article className="show-card">
      <h3>
        <Link to={`/shows/${show.id}`}>{show.name}</Link>
      </h3>

      {show.image ? (
        <img
          src={show.image.medium}
          alt={'Poster for ' + show.name}
        />
      ) : (
        <p>Poster: Not available</p>
      )}

      <p>{summary}</p>

      <p>
        Premiere date: {show.premiered ? show.premiered : 'Not available'}
      </p>

      <p>
        Last updated: {formatDate(show.updated)}
      </p>

      <p>
        Genres: {show.genres.length > 0
          ? show.genres.join(', ')
          : 'Not available'}
      </p>

      <p>
        Average rating: {show.rating.average
          ? show.rating.average
          : 'Not available'}
      </p>

      <h4>Main Cast</h4>

      {castLoading && <p>Loading cast...</p>}

      {castError && <p>{castError}</p>}

      {!castLoading && !castError && cast.length === 0 && (
        <p>Cast: Not available</p>
      )}

      {!castLoading && !castError && cast.length > 0 && (
        <ul>
          {cast.map(item => (
            <li key={item.person.id}>
              {item.person.name}
            </li>
          ))}
        </ul>
      )}

      <a href={show.url} target="_blank">
        View on TVmaze
      </a>
    </article>
  )
}

export default ShowCard