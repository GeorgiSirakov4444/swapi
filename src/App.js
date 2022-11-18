import React, {useState} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviehandler () {
    setIsLoading(true);
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
    setIsLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies :(</p>}
        {isLoading && <p>Loading ...</p>}
      </section>
    </React.Fragment>
  );
}
export default App;