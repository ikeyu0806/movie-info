import * as React from 'react'
import axios from 'axios'
import { useState } from "react"
import Layout from '../components/Layout'

interface User {
  name: string
  email: string
  password: string
}

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [user, setUser] = useState<User>({name: "", email: "", password: ""});
  const CurrentUserContext = React.createContext<User>({name: "", email: "", password: ""});

  const params: User = {
    name: name,
    email: email,
    password: password1
  }

  const ExecSignUp = () => {
    axios.post('http://localhost:3002/signup', {
      headers: {
        'Content-Type': 'application/json'
      }, params
    })
    .then((response) => {
      console.log(response.data)
      setUser({name: name, email: email, password: ""})
      console.log(user)
      console.log(name)
      localStorage.setItem('jwt_token', response.data.token)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  return (
    <CurrentUserContext.Provider value={user}>
      <Layout title="映画情報サービス">
        <div className="authentication-form">
          <div className="field">
            <h1>ユーザ登録</h1>
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

          <div className="field">
            <div className="control">
              <label className="checkbox">
                <input type="checkbox" />
                <a href="#">規約</a>に同意します。
              </label>
            </div>
          </div>

          <div className="field is-grouped confirm-buttons">
            <div className="control">
              <button className="button is-link" onClick={ExecSignUp}>送信</button>
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
    </CurrentUserContext.Provider>
  )
}

export default SignUp
