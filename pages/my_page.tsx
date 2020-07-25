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

  const ExecLogOut = () => {
    localStorage.removeItem('current_user')
    setCurrentUser({id: 0, token: "", name: "", email: ""})
  }

  return (
    <Layout title="MY Page">
      <div className="my-page">
        <h1>マイページ</h1>
        {currentUser.name
          ?
            <div>
              <p>名前: {currentUser.name}</p> 
              <a id="logout-btn" className="button is-danger" onClick={ExecLogOut}>
                ログアウト
              </a>
            </div>
          : 
            <p>ログインしてください</p>}
          <Link href="/">
            <a>ホームに戻る</a>
          </Link>
      </div>
      <style jsx>{`
        h1 {
          font-size: 150%;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .my-page {
          text-align: center;
          margin-top: 40px;
        }
        #logout-btn {
          margin-top: 20px;
          margin-bottom: 20px;
        }
      `}</style>
    </Layout>
  )
}

export default MyPage
