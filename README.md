# CSC 372 Assignment 5 - TVmaze Show Gallery

This project is a React version of my Assignment 4 TVmaze show gallery. Users can search for TV shows, view up to 10 results, see show information and cast members, and open a separate detail page for each show.

## How to Run

1. Install the dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## React Concepts Used

| Concept | File |
|---|---|
| Components and Props | SearchForm.jsx, ShowList.jsx, ShowCard.jsx, ShowDetail.jsx |
| Lists and Keys | ShowList.jsx, ShowCard.jsx, ShowDetail.jsx |
| Conditional Rendering | ShowList.jsx, ShowCard.jsx, ShowDetail.jsx |
| Controlled Form | SearchForm.jsx |
| useState | GalleryPage.jsx, ShowCard.jsx, ShowDetail.jsx |
| useEffect and Fetch | GalleryPage.jsx, ShowCard.jsx, ShowDetail.jsx |
| Lifted State | GalleryPage.jsx |
| React Router | App.jsx, ShowCard.jsx, ShowDetail.jsx |

## Reflection

In Assignment 4, I built the TVmaze gallery using regular JavaScript and manually updated the DOM. I used functions such as `createElement()` and had to control when elements were added or removed from the page. In this React version, the same application is divided into components such as SearchForm, ShowList, ShowCard, and ShowDetail. This made the structure of the project easier to organize because each component has a specific purpose.

React state also changed how I handled the search and API data. I placed the search query, submitted search term, results, loading state, and error state in GalleryPage because both the form and results depend on that information. The state is passed to other components through props. I also used `useEffect` to fetch show and cast data instead of manually controlling when requests run. React Router made it possible to create a separate detail page for each show without reloading the whole application. Overall, React required more files, but the application became more organized and reusable.
