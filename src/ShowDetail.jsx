import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { stripHtml, formatDate } from './utils'

function ShowDetail() {
  const { id } = useParams()

  const [show, setShow] = useState(null)
  const [cast, setCast] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [castLoading, setCastLoading] = useState(true)
  const [castError, setCastError] = useState(null)

  useEffect(() => {
    async function fetchShow() {
      setLoading(true)
      setError(null)

      try {
        const res = await fetch(
          `https://api.tvmaze.com/shows/${id}`
        )

        if (res.status === 429) {
          throw new Error('Too many requests. Please try again shortly.')
        }

        if (!res.ok) {
          throw new Error('Show could not be found.')
        }

        const data = await res.json()
        setShow(data)
      } catch (err) {
        console.error('Failed to load show', err)
        setError(err.message)
        setShow(null)
      }

      setLoading(false)
    }

    fetchShow()
  }, [id])

  useEffect(() => {
    async function fetchCast() {
      setCastLoading(true)
      setCastError(null)

      try {
        const res = await fetch(
          `https://api.tvmaze.com/shows/${id}/cast`
        )

        if (res.status === 429) {
          throw new Error('Too many requests.')
        }

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data = await res.json()
        setCast(data.slice(0, 15))
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
  }, [id])

  if (loading) {
    return <p>Loading show...</p>
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
        <Link to="/">Back to Show Gallery</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{show.name}</h1>

      {show.image ? (
        <img
          src={show.image.medium}
          alt={'Poster for ' + show.name}
        />
      ) : (
        <p>Poster: Not available</p>
      )}

      <p>
        {show.summary
          ? stripHtml(show.summary)
          : 'Summary: Not available'}
      </p>

      <p>
        Premiere date: {show.premiered
          ? show.premiered
          : 'Not available'}
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

      <p>
        Status: {show.status
          ? show.status
          : 'Not available'}
      </p>

      <p>
        Network/Streaming: {
          show.network
            ? show.network.name
            : show.webChannel
              ? show.webChannel.name
              : 'Not available'
        }
      </p>

      <h2>Cast</h2>

      {castLoading && <p>Loading cast...</p>}

      {castError && <p>{castError}</p>}

      {!castLoading && !castError && cast.length === 0 && (
        <p>Cast: Not available</p>
      )}

      {!castLoading && !castError && cast.length > 0 && (
        <ul>
          {cast.map(item => (
            <li key={item.person.id}>
              {item.person.name} as {item.character.name}
            </li>
          ))}
        </ul>
      )}

      <p>
        <a href={show.url} target="_blank">
          View on TVmaze
        </a>
      </p>

      <p>
        <Link to="/">Back to Show Gallery</Link>
      </p>
    </main>
  )
}

export default ShowDetail