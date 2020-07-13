import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
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
        <Link href="/about">
          <a className="navbar-item">My Page</a>
        </Link>{' '}
        {' '}
        <Link href="/users">
          <a className="navbar-item">Search</a>
        </Link>{' '}
         <a href="/api/users" className="navbar-item">News</a>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <a className="button is-primary" href="/signup">
                <strong>ユーザ登録</strong>
              </a>
              <a className="button is-light">
                ログイン
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
    {children}
    <footer className="content has-text-centered">
      <hr />
      <span>© {new Date().getFullYear()} Yuki Ikegaya</span>
    </footer>
  </div>
)

export default Layout
