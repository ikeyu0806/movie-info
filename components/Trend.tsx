import * as React from 'react'
import { useState, useEffect } from "react"
import axios from 'axios'

import { TrendMovie } from '../interfaces/trend_movie'

const Trend = () => {
  const [trendMovies, setTrendMovies] = useState<TrendMovie[]>([]);

  useEffect(() => {
    async function fetchRooms() {
      const trendMovies = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key='　+ process.env.tmdbApi + '&language=ja&page=1',
      );
      setTrendMovies(trendMovies.data.results);
    }
    fetchRooms();
  }, []);

  return (
    <div className="columns is-vcentered">
      {trendMovies.slice(1, 9).map((movie, i) => (
        <div key={i}>
          <div className="column">
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}></img>
            <div>{movie.original_title}</div>
          </div>
          <br/>
        </div>
      ))}
    </div>
  )
}

export default Trend
