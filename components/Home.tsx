import React, { useState, useEffect } from "react"
import axios from 'axios'
import Showing from './Showing'
import Popular from './Popular'
import Layout from '../components/Layout'

const Home = (): JSX.Element => {
  const [loginFlash, setLoginFlash] = useState<boolean>(false)
  const [logoutFlash, setLogoutFlash] = useState<boolean>(false)
  const [isServerRunning, setIsServerRunning] = useState<boolean>(true)

  useEffect(() => {
    window.location.search.match(/after_login=true/) && setLoginFlash(true)
    window.location.search.match(/after_logout=true/) && setLogoutFlash(true)
    axios.get(process.env.BACKEND_URL + '/is_running')
    .then(() => {
      setIsServerRunning(true)
    })
    .catch((error) => {
      console.log(error)
      setIsServerRunning(false)
    })
  }, []);

  return (
    <Layout title="映画情報サービス">
    {!isServerRunning && <div className="notification is-danger">
      現在バックエンドAPIサーバが稼働していないため、ログイン、レビュー機能などが使えません。
    </div>}
    {loginFlash && <div className="notification is-primary">
      <button className="delete" onClick={() => setLoginFlash(false)}></button>
      ログインしました。
    </div>}
    {logoutFlash && <div className="notification is-danger">
      <button className="delete" onClick={() => setLogoutFlash(false)}></button>
      ログアウトしました。
    </div>}
    <h1>公開中の映画</h1>
    <Showing />
    <h1>人気の映画</h1>
    <Popular />
    <style jsx>{`
      h1 {
        font-size: 150%;
        margin: 20px;
        text-align: center;
        font-weight: bold;
      }
    `}</style>
  </Layout>
  )
}

export default Home
