import Layout from '../../components/Layout'
import { useState, useEffect } from "react"
import axios from 'axios'

import { Movie } from '../../interfaces/Movie'

const MovieDetail = () => {
  const [movie, setMovie] = useState<Movie>({ id: 0,
                                              title: '',
                                              poster_path: '',
                                              backdrop_path: '',
                                              overview: '',
                                              homepage: '',
                                              vote_average: 0,
                                              vote_count: 0
                                            });

  useEffect(() => {
    async function fetchMovie() {
      const Movie = await axios.get(
        'https://api.themoviedb.org/3/movie/' + window.location.pathname.split('/')[2] + '?api_key='　+ process.env.tmdbApi + '&language=ja',
      );
      setMovie({id: Movie.data.id,
                title: Movie.data.title,
                poster_path: Movie.data.poster_path,
                backdrop_path: Movie.data.backdrop_path,
                overview: Movie.data.overview,
                homepage: Movie.data.homepage,
                vote_average: Movie.data.vote_average,
                vote_count: Movie.data.vote_count
              })
    }
    fetchMovie();
  }, []);
  return (
    <Layout title="映画情報サービス">
      <p>{movie.title}</p>
      <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}></img>
      <img src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path}></img>
      <p>{movie.overview}</p>
      <p>{movie.homepage}</p>
      <p>{movie.vote_average}</p>
      <p>{movie.vote_count}</p>
    </Layout>
  )
}

export default MovieDetail;
