import Layout from '../components/Layout'
import Trend from '../components/Trend'


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
  </Layout>
  
)

export default IndexPage
