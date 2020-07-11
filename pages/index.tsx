import Link from 'next/link'
import Layout from '../components/Layout'
import Trend from '../components/Trend'


const IndexPage = () => (

  <Layout title="映画情報サービス">
    <h1>公開中の映画</h1>
    <Trend />
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
)

export default IndexPage
