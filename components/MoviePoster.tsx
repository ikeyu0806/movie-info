import React from 'react'
import Link from 'next/link'
import { MoviePoster as MoviePosterType } from '../interfaces/MoviePoster'

type Props = {
  movie: MoviePosterType
}

const MoviePoster = ({ movie }: Props): JSX.Element => {
  return (
    <div className="column">
      <Link href={`/Movie/${movie.id}`}>
        <img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className="poster-img"></img>
      </Link>
    <div>{movie.title}</div>
  </div>
  )
}

export default MoviePoster
