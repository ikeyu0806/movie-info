import Link from 'next/link'
import Layout from '../components/Layout'
import { useEffect, useState } from "react"
import { CurrentUser } from '../interfaces/User'

const MyPage = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({id: 0, token: "", name: "", email: ""});

  useEffect(() => {
    const currentUserInfo = localStorage.getItem('current_user');
    if (currentUserInfo) {
      setCurrentUser(JSON.parse(currentUserInfo));
    }
  }, []);

  return (
    <Layout title="MY Page">  
      <h1>MyPage</h1>
      {currentUser.name
        ?
          <div>
            <p>This is the about page</p> 
            <a className="button is-danger">
              ログアウト
            </a>
          </div>
        : 
          <p>ログインしてください</p>}
        <Link href="/">
          <a>ホームに戻る</a>
        </Link>
    </Layout>
  )
}

export default MyPage
