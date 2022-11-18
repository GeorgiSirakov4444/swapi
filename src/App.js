import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviehandler () {
    const response = await fetch('https://swapi.dev/api/films/');
    const data = await response.json();

    const transformedMoviesObjects = data.results.map((transformedData) => {
        return {
          id: transformedData.episode_id,
          title: transformedData.title,
          openingText: transformedData.opening_crawl,
          releaseDate: transformedData.release_date,
        };
    });
    setMovies(transformedMoviesObjects);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}
export default App;