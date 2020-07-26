import * as React from 'react'
import axios from 'axios'
import { useState, createContext } from "react"
import Layout from '../components/Layout'
import { CurrentUser } from '../interfaces/User'

export const CurrentUserContext = createContext<CurrentUser>({id: 0, token: "", name: "", email: ""})

const Login = () => {
  const [name, setName] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<CurrentUser>({id: 0, token: "", name: "", email: ""})

  const params = new URLSearchParams();
  params.append('name', name)
  params.append('password', password1)

  const ExecLogin = () => {
    axios.post('http://localhost:3002/login', params)
    .then((response) => {
      setCurrentUser({id: 0, token: response.data.token, name: name, email: response.data.user.email})
      localStorage.setItem('current_user',JSON.stringify({id: 0, token: response.data.token, name: name}))
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (

    <CurrentUserContext.Provider value={currentUser}>
      <Layout title="映画情報サービス">
      {currentUser.token
      ?
      <>
        <p>ログインしています</p>
        <style jsx>{`
        p {
          margin-top: 30px;
          display: grid;
          place-items: center;
        }
        `}</style>
      </>
      :
      <>
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
      </>
    }
    </Layout>
  </CurrentUserContext.Provider>
  )
}

export default Login
