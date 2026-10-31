function SearchForm({ query, setQuery, onSearch }) {
  function handleSubmit(event) {
    event.preventDefault()
    onSearch()
  }

  return (
    <section id="search-section">
      <h2>Search for Shows</h2>

      <form id="show-search-form" onSubmit={handleSubmit}>
        <label htmlFor="show-search">Show title or keyword:</label>

        <input
          type="text"
          id="show-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Example: Friends"
        />

        <button type="submit">Search</button>
      </form>
    </section>
  )
}

export default SearchForm