import Layout from '../components/Layout'
import Showing from '../components/Showing'
import Popular from '../components/Popular'
import React, { useState, useEffect } from "react"

const IndexPage = (): JSX.Element => {
  const [loginFlash, setLoginFlash] = useState<boolean>(false)
  const [logoutFlash, setLogoutFlash] = useState<boolean>(false)

  useEffect(() => {
    window.location.search.match(/after_login=true/) && setLoginFlash(true)
    window.location.search.match(/after_logout=true/) && setLogoutFlash(true)
  }, [])

  return (
    <Layout title="映画情報サービス">
      {loginFlash && <div className="notification is-primary">
        <button className="delete" onClick={() => setLoginFlash(false)}></button>
        ログインしました。
      </div>}
      {logoutFlash && <div className="notification is-danger">
        <button className="delete" onClick={() => setLogoutFlash(false)}></button>
        ログアウトしました。
      </div>}
      <h1>公開中の映画</h1>
      <style jsx>{`
        h1 {
          font-size: 150%;
          margin: 20px;
          text-align: center;
          font-weight: bold;
        }
      `}</style>
      <Showing />
      <h1>人気の映画</h1>
      <Popular />
    </Layout>
  )
}

export default IndexPage
