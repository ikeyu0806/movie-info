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

  const [isShowModal, setIsShowModal] = useState<boolean>(false)
  const [score, setScore] = useState<number>(1)

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

  const showModal = () => {
    setIsShowModal(true)
  }

  const closeModal = () => {
    setIsShowModal(false)
  }

  const keepScore = (num: number) => {
    setScore(num)
  }

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
            <a className="button is-primary review-button" onClick={showModal}>
              <strong>レビューを投稿する</strong>
            </a>
            <div className={isShowModal ? "modal is-active" : "modal"}>
              <div className="modal-background"></div>
                <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">{movie.title}</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                  </header>
                  <section className="modal-card-body">
                  <div className="field">
                    <label className="label">感想</label>
                    <div className="control">
                      <textarea className="textarea"></textarea>
                    </div>
                  </div>
                  <div className="field rate-field columns">
                    {console.log(score)}
                    <a className={(score >= 1) ? "star yellow-star" : "star silver-star"} onClick={() => keepScore(1)}>★</a>
                    <a className={(score >= 2) ? "star yellow-star" : "star silver-star"} onClick={() => keepScore(2)}>★</a>
                    <a className={(score >= 3) ? "star yellow-star" : "star silver-star"} onClick={() => keepScore(3)}>★</a>
                    <a className={(score >= 4) ? "star yellow-star" : "star silver-star"} onClick={() => keepScore(4)}>★</a>
                    <a className={(score >= 5) ? "star yellow-star" : "star silver-star"} onClick={() => keepScore(5)}>★</a>
                  </div>
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button is-success">投稿する</button>
                    <button className="button" onClick={closeModal}>キャンセル</button>
                  </footer>
                </div>
            </div>
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
        .review-button {
          margin-top: 15px;
        }
        .rate-field {
          margin-top: 10px;
          margin-bottom: 30px;
          margin-left: 5px;
        }
        .star {
          position: relative;
          font-size: 30px;
          letter-spacing : 0px;
        }
        .yellow-star {
          color: yellow;
        }
        .silver-star {
          color: silver;
        }
      `}</style>
    </Layout>
  )
}

export default MovieDetail;
