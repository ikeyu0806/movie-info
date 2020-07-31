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
      <div id="movie-detail" className="columns is-mobile">
          <div className="column">
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path}></img>
          </div>
          <div className="column movie-text-info">
            <h1>{movie.title}</h1>
            <p id="overview">{movie.overview}</p>
            {movie.homepage && <><br /><strong id="official-site">公式サイト</strong><br /></>}
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
            <p className="tmdb-evaluate">TMDBの評価: {movie.vote_average}</p>
            <p className="tmdb-evaluate">TMDBのレビュー数: {movie.vote_count}</p>
          </div>
      </div>
      <style jsx>{`
        h1 {
          font-size: 200%;
          font-weight: bold;
        }
        #overview {
          margin-top: 10px;
        }
        #official-site {
          font-size: 20px;
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
      .tmdb-evaluate {
          margin-top: 10px;
      }
      `}</style>
    </Layout>
  )
}

export default MovieDetail;
