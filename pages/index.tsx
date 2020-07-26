import Layout from '../components/Layout'
import Trend from '../components/Trend'
import Popular from '../components/Popular'

const IndexPage = () => (

  <Layout title="映画情報サービス">
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

export default IndexPage
