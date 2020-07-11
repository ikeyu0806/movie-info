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
    <ul>
    {trendMovies.map((movie, i) => (
      <li key={i}>
        {movie.original_title}
      </li>
    ))}
  </ul>
  )
}

export default Trend
