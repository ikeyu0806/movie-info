import React from 'react'
import Link from 'next/link'
import { MoviePoster as MoviePosterType } from '../interfaces/MoviePoster'

type Props = {
  movie: MoviePosterType
}

const MoviePoster = ({ movie }: Props): JSX.Element => {
  return (
    <>
      <div className="column">
          <Link href={`/movie/${movie.id}`}>
            <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className="poster-img"></img>
          </Link>
        <div>{movie.title}</div>
      </div>
      <style jsx>{`
        .poster-img {
          transition-duration: 0.5s;
        }
        .poster-img:hover{
          box-shadow: 10px 10px 10px rgba(0,0,0,0.5);
          transform: translateY(-20px);
          transition-duration: 0.5s;
        }
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

export default MoviePoster
