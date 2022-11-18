import React, { useState } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviehandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }

  let content = <p>Found no movies :(</p>;

  if(movies.length > 0){
    content = <MoviesList movies={movies} />;
  }
  if(error){
    content = <p>{error}</p>;
  }
  if(isLoading){
    content = <p>Loading ...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviehandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}
export default App;
