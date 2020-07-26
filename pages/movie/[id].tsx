import Layout from '../../components/Layout'
import { useState, useEffect } from "react"
import axios from 'axios'

import { Movie } from '../../interfaces/Movie'

const MovieDetail = () => {
  const [movie, setMovie] = useState<Movie>({id: 0, title: '', poster_path: ''});

  useEffect(() => {
    async function fetchMovie() {
      const Movie = await axios.get(
        'https://api.themoviedb.org/3/movie/' + window.location.pathname.split('/')[2] + '?api_key='　+ process.env.tmdbApi + '&language=ja',
      );
      setMovie({id: Movie.data.id, title: Movie.data.title, poster_path: Movie.data.poster_path})
      // console.log(Movie.data.id)
      // console.log(movie)
    }
    fetchMovie();
  }, []);
  return (
    <Layout title="映画情報サービス">
      <h1>Hi</h1>
      <p>{movie.title}</p>
      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}></img>
    </Layout>
  )
}

export default MovieDetail;
