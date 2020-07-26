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
      <div id="movie-detail">
        <h1>{movie.title}</h1>
        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} id="poster"></img>
        <img src={"https://image.tmdb.org/t/p/w500/" + movie.backdrop_path} id="backdrop"></img>
        <p>{movie.overview}</p>
        <p>{movie.homepage}</p>
        <p>{movie.vote_average}</p>
        <p>{movie.vote_count}</p>
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
          font-size: 200%;
          font-weight: bold;
        }
        #poster {
          width: 30%;
          height: 30%;
        }
        #backdrop {
          width: 30%;
          height: 30%;
        }
        #movie-detail {
          margin: 0 auto;
          padding: 40px ;
          width: 90%;
        }
      `}</style>
    </Layout>
  )
}

export default MovieDetail;
