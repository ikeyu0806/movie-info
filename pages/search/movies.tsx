import React, { useState, useEffect } from "react"
import Layout from '../../components/Layout'
import { MoviePoster } from '../../interfaces/MoviePoster'
import axios from 'axios'

const SearchMoviesPage = (): JSX.Element => {
  const [movies, setMovies] = useState<MoviePoster[]>([]);
  const [keyword, setKeyword] = useState<string>("STAR WARS");

  useEffect(() => {
    async function fetchMovies() {
      const movies = await axios.get(
        'https://api.themoviedb.org/3/search/movie?api_key=' + process.env.tmdbApi + '&query=' + keyword,
      );
      setMovies(movies.data.results);
    }
    fetchMovies();
  }, []);

  const getMovies = () => {
    async function fetchMovies() {
      const movies = await axios.get(
        'https://api.themoviedb.org/3/search/movie?api_key=' + process.env.tmdbApi + '&query=' + keyword,
      );
      setMovies(movies.data.results);
    }
    fetchMovies();
  }

  return (
    <>
    <Layout title="映画情報サービス">
      <div className="field has-addons has-addons-centered search-field">
        <div className="control is-expanded">
          <input className="input" type="text" placeholder="映画名を入力してください" onChange={(e) => { setKeyword(e.target.value)}} value={keyword} />
        </div>
        <div className="control">
          <a className="button is-info" onClick={getMovies}>
            Search
          </a>
        </div>
      </div>
      <table className="table is-narrow">
        <thead>
          <tr>
            <th>ポスター</th>
            <th>名前</th>
            <th>詳細ページ</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, i) => (
            <tr key={i}>
              <td><img src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} className="poster"></img></td>
              <td>{movie.title}</td>
              <td>{<a className="button is-primary" href={"/movie/" + movie.id} target="_blank" rel="noopener noreferrer">
                    <strong>もっと見る</strong>
                  </a>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
    <style jsx>{`
      .search-field {
        margin-top: 20px;
        margin-left: 400px;
        margin-right: 400px;
      }
      .table {
        margin-left: auto;
        margin-right: auto;
      }
      .poster {
        width: 100px;
        height: 120px;
      }
    `}</style>
    </>
  )
}

export default SearchMoviesPage
