import React, { ReactNode } from 'react'
import { useEffect, useState, useContext } from "react"
import { CurrentUserContext } from '../pages/signup'
import { CurrentUser } from '../interfaces/User'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>({id: 0, token: "", name: "", email: ""});

  useEffect(() => {
    const currentUserInfo = localStorage.getItem('current_user');
    if (currentUserInfo) {
      setCurrentUser(JSON.parse(currentUserInfo));
    }
  }, []);
  const loginUser = useContext(CurrentUserContext);
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css"></link>
      </Head>
      <header>
        <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
          <Link href="/">
            <a className="navbar-item">Top</a>
          </Link>{' '}
          {' '}
          <Link href="/my_page">
            <a className="navbar-item">My Page</a>
          </Link>{' '}
          {' '}
          <Link href="/search/movies">
            <a className="navbar-item">Search</a>
          </Link>{' '}
          {' '}

          <div className="navbar-end">
            <div className="navbar-item">
              {currentUser.name || loginUser.name
                ? <div>{currentUser.name ? currentUser.name : loginUser.name}でログイン中です</div>
                :              
                <div className="buttons">
                  <a className="button is-primary" href="/signup">
                    <strong>ユーザ登録</strong>
                  </a>
                  <a className="button is-light" href="/login">
                  <strong>ログイン</strong>
                  </a>
                </div>
              }
            </div>
          </div>
        </nav>
      </header>
      {children}
      <footer className="content has-text-centered">
        <hr />
        <span>© {new Date().getFullYear()} Yuki Ikegaya</span>
      </footer>
    </>
  )
}

export default Layout
