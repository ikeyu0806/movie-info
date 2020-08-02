import Layout from '../components/Layout'
import Trend from '../components/Trend'
import Popular from '../components/Popular'
import { useState, useEffect } from "react"

const IndexPage = () => {
  const [showFlash, setShowFlash] = useState<boolean>(false)

  useEffect(() => {
    window.location.search.match(/after_login=true/) && setShowFlash(true)
  }, [])

  return (
    <Layout title="映画情報サービス">
      {showFlash && <div className="notification is-primary">
        <button className="delete" onClick={() => setShowFlash(false)}></button>
        ログインしました。
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
      <Trend />
      <h1>人気の映画</h1>
      <Popular />
    </Layout>
  )
}

export default IndexPage
