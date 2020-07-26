import * as React from 'react'
import axios from 'axios'
import { useState, createContext } from "react"
import Layout from '../components/Layout'
import { CurrentUser } from '../interfaces/User'

export const CurrentUserContext = createContext<CurrentUser>({id: 0, token: "", name: "", email: ""})

const Login = () => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<CurrentUser>({id: 0, token: "", name: "", email: ""})

  const params = new URLSearchParams();
  params.append('name', name)
  params.append('email', email)
  params.append('password', password1)

  const ExecLogin = () => {
    axios.post('http://localhost:3002/login', params)
    .then((response) => {
      console.log(response.data)
      setCurrentUser({id: 0, token: response.data.token, name: name, email: email})
      localStorage.setItem('current_user',JSON.stringify({id: 0, token: response.data.token, name: name, email: email}))
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (

    <CurrentUserContext.Provider value={currentUser}>
      {currentUser.token
      ?
        <p>ログインしています</p>
      :
      <Layout title="映画情報サービス">
        <div className="authentication-form">
          <div className="field">
            <h1>ログイン</h1>
          </div>
          <div className="field">
            <label className="label">ユーザ名</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="ユーザ名" onChange={(e) => { setName(e.target.value)}} value={name}></input>
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">メールアドレス</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="メールアドレス" onChange={(e) => { setEmail(e.target.value)}} value={email}></input>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">パスワード</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="password1" placeholder="パスワード" onChange={(e) => { setPassword1(e.target.value)}} value={password1}></input>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <label className="label">パスワード（確認）</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="password2" placeholder="パスワード（確認）" onChange={(e) => { setPassword2(e.target.value)}} value={password2}></input>
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div className="field is-grouped confirm-buttons">
            <div className="control">
              <button className="button is-link" onClick={ExecLogin}>送信</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">キャンセル</button>
            </div>
          </div>
        </div>
        <style jsx>{`
          h1 {
            font-size: 150%;
            font-weight: bold;
          }
          .authentication-form {
            margin: 0 auto;
            padding: 40px ;
            width: 30%;
          }
          .confirm-buttons {
            margin-top: 20px;
          }
        `}</style>
      </Layout>
    }
  </CurrentUserContext.Provider>
  )
}

export default Login
