import Link from 'next/link'
import Layout from '../components/Layout'

const MyPage = () => (
  <Layout title="MY Page">
    <h1>MyPage</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>ホームに戻る</a>
      </Link>
    </p>
  </Layout>
)

export default MyPage
