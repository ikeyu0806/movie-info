import * as React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'
import { MoviePoster as MoviePosterType } from '../interfaces/MoviePoster'
import MoviePoster from '../components/MoviePoster'

const Popular = (): JSX.Element => {
  const [trendMovies, setShowingMovies] = useState<MoviePosterType[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const trendMovies = await axios.get(
        'https://api.themoviedb.org/3/movie/popular?api_key=' + process.env.tmdbApi + '&language=ja&page=1',
      );
      setShowingMovies(trendMovies.data.results);
    }
    fetchMovies();
  }, []);

  return (
    <>
    <div className="columns is-vcentered">
      {trendMovies.slice(1, 9).map((movie, i) => (
        <div key={i}>
          <MoviePoster movie={movie}></MoviePoster>
          <br/>
        </div>
      ))}
    </div>
    </>
  )
}

export default Popular
