import ShowCard from './ShowCard'

function ShowList({ shows, searchTerm }) {
  if (searchTerm === '') {
    return <p>Please enter a show title or keyword.</p>
  }

  if (shows.length === 0) {
    return <p>No matching shows were found for "{searchTerm}".</p>
  }

  return (
    <section id ="results-section">
      <h2>Show Results</h2>

      <p>
        {shows.length} result(s) for "{searchTerm}"
      </p>

      <div id="show-gallery">
        {shows.map(result => (
          <ShowCard
            key={result.show.id}
            show={result.show}
          />
        ))}
      </div>
    </section>
  )
}

export default ShowList