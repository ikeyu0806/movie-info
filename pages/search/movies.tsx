import Layout from '../../components/Layout'
import React from "react"

const SearchMoviesPage = (): JSX.Element => {

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
    </Layout>
    <style jsx>{`
      .search-field {
        margin-top: 20px;
        margin-left: 400px;
        margin-right: 400px;
      }
    `}</style>
    </>
  )
}

export default SearchMoviesPage
