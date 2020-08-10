import React, { useState, useEffect } from "react"
import Layout from '../../components/Layout'
import { MovieName } from '../../interfaces/MovieName'
import axios from 'axios'

const SearchMoviesPage = (): JSX.Element => {
  const [movies, setMovies] = useState<MovieName[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      const movies = await axios.get(
        'https://api.themoviedb.org/3/search/keyword?api_key=' + process.env.tmdbApi + '&language=ja&query=disney',
      );
      setMovies(movies.data.results);
    }
    fetchMovies();
  }, []);

  return (
    <>
    <Layout title="映画情報サービス">
      <div className="field has-addons has-addons-centered search-field">
        <div className="control is-expanded">
          <input className="input" type="text" placeholder="映画名を入力してください" />
        </div>
        <div className="control">
          <a className="button is-info">
            Search
          </a>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>名前</th>
            <th>もっと見る</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          {movies.map((movie, i) => (
            <div key={i}>
              <th>{movie.name}</th>
              <td>{<a className="button is-primary" href={"/movie/" + movie.id}>
                    <strong>ユーザ登録</strong>
                  </a>}
              </td>
            </div>
          ))}
          </tr>
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
    `}</style>
    </>
  )
}

export default SearchMoviesPage
