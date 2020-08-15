import * as React from 'react'
import { useState, useEffect } from "react"
import Link from 'next/link'
import axios from 'axios'

import { MoviePoster } from '../interfaces/MoviePoster'

const Showing = (): JSX.Element => {
  const [trendMovies, setShowingMovies] = useState<MoviePoster[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const trendMovies = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=' + process.env.tmdbApi + '&language=ja&page=1',
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
          <div className="column">
            <Link href={`/Movie/${movie.id}`}>
              <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className="poster-img"></img>
            </Link>
            <div>{movie.title}</div>
          </div>
          <br/>
        </div>
      ))}
    </div>
    <style jsx>{`
      @media screen and (max-width: 768px) {
        .column {
          text-align: center;
        }
        .poster-img {
          width: 80%;
          height: 80%
        }
      }
    `}</style>
    </>
  )
}

export default Showing
