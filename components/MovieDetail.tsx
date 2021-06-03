import Layout from '../components/Layout'
import React, { useState, useEffect } from "react"
import axios from 'axios'
import { Review } from '../interfaces/Review'
import { Movie } from '../interfaces/Movie'
import { useRouter } from 'next/router'

const MovieDetail = (): JSX.Element => {
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
  const [score, setScore] = useState<number>(3)
  const [comment, setComment] = useState<string>("")
  const [isPostReview, setIsPostReview] = useState<boolean>(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [login, setLogin] = useState<boolean>(false)
  const [userID, setUserID] = useState<number | null>(null)
  const [isSmartPhone, setIsSmartPhone] = useState<boolean>(false)

  useEffect(() => {
    async function fetchMovie() {
      const Movie = await axios.get(
        'https://api.themoviedb.org/3/movie/' + window.location.pathname.split('/')[2] + '?api_key=' + process.env.tmdbApi + '&language=ja',
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
    async function fetchReviews() {
      const Reviews = await axios.get(
        'http://localhost:3002/review/' + window.location.pathname.split('/')[2]
      );
      setReviews(Reviews.data)
    }
    fetchReviews();
    const current_user = JSON.parse(localStorage.getItem("current_user")  || '{}')
    const current_user_id = current_user.user_id
    setUserID(current_user_id)
    window.location.search.match(/review=success/) && setIsPostReview(true);
    localStorage.getItem("current_user") != null && setLogin(true);
    setIsSmartPhone(navigator.userAgent.match(/iPhone|Android.+Mobile/) !== null)
  }, []);

  const showModal = () => { 
    setIsShowModal(true)
  }

  const closeModal = () => {
    setIsShowModal(false)
  }

  const router = useRouter();

  const params: Review = {
    movie_id: movie.id,
    public_id: Math.floor( Math.random() * (999999)),
    comment: comment,
    score: score,
    user_id: userID
  }

  const submitReview = () => {
    axios.post('http://localhost:3002/review/create', params)
    .then((response) => {
      console.log(response)
      router.push({
        pathname: '/movie/' + movie.id,
        query: { review: 'success' }
      })
      location.reload()
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <Layout title="映画情報サービス">
      {isPostReview &&
      <div className="notification is-primary">
        <button className="delete" onClick={() => setIsPostReview(false)}></button>
        レビューを投稿しました。
      </div>}
      <div id="movie-detail" className={isSmartPhone ? "" : "columns is-mobile"}>
          <div className="column">
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className="poster-img"></img>
          </div>
          <div className="column movie-text-info">
            <h1>{movie.title}</h1>
            <span className="tag is-light">解説</span>
            <p id="overview">{movie.overview}</p>
            {movie.homepage && <><br /><strong id="official-site">公式サイト</strong><br /></>}
            <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
            <p className="tmdb-evaluate">TMDBの評価: {movie.vote_average}</p>
            <p className="tmdb-evaluate">TMDBのレビュー数: {movie.vote_count}</p>
            {login &&
              <a className="button is-primary review-button" onClick={showModal}>
                <strong>レビューを投稿する</strong>
              </a>
            }
            <div className="reviews">
              <div className="review-list"><span className="tag is-light is-large">レビュー一覧</span></div>
              <div className="review-contents">
                {console.log(reviews)}
                {reviews.map((review: Review, i: number) => (
                  <div key={i} className="box">
                    <div className="columns reviewed-stars">
                      <div className={(review.score >= 1) ? "yellow-star" : "silver-star"}>★</div>
                      <div className={(review.score >= 2) ? "yellow-star" : "silver-star"}>★</div>
                      <div className={(review.score >= 3) ? "yellow-star" : "silver-star"}>★</div>
                      <div className={(review.score >= 4) ? "yellow-star" : "silver-star"}>★</div>
                      <div className={(review.score >= 5) ? "yellow-star" : "silver-star"}>★</div>
                      <span className="tag is-warning review-user">{review.User && review.User.name + "さん"}</span>
                    </div>
                    <article className="media review-comment">{review.comment}</article>
                  </div>
                ))}
              </div>
            </div>
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
                      <textarea className="textarea" onChange={(e) => { setComment(e.target.value)}}></textarea>
                    </div>
                  </div>
                  <div className="field rate-field columns star">
                    <a className={(score >= 1) ? "yellow-star" : "silver-star"} onClick={() => setScore(1)}>★</a>
                    <a className={(score >= 2) ? "yellow-star" : "silver-star"} onClick={() => setScore(2)}>★</a>
                    <a className={(score >= 3) ? "yellow-star" : "silver-star"} onClick={() => setScore(3)}>★</a>
                    <a className={(score >= 4) ? "yellow-star" : "silver-star"} onClick={() => setScore(4)}>★</a>
                    <a className={(score >= 5) ? "yellow-star" : "silver-star"} onClick={() => setScore(5)}>★</a>
                  </div>
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button is-success" onClick={submitReview}>投稿する</button>
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
        .comments {
          margin-top: 20px;
        }
        .reviews {
          margin-top: 20px;
        }
        .review-list {
          margin-bottom: 20px;
        }
        .review-comment {
          margin-bottom: 30px;
          margin-left: 10px;
        }
        .reviewed-stars {
          margin-left: 10px;
        }
        .reviewed-star {
          position: relative;
          font-size: 15px;
          letter-spacing : 0px;
        }
        .review-user {
          margin-left: 10px;
        }
        @media screen and (max-width: 768px) {
          .poster-img {
            width: 80%;
            height: 80%;
          }
        }
      `}</style>
    </Layout>
  )
}

export default MovieDetail
