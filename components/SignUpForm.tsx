import * as React from 'react'
import axios from 'axios'
import { useState, createContext } from "react"
import Layout from '../components/Layout'
import SubmitButton from '../components/SubmitButton'
import { User, CurrentUser } from '../interfaces/User'
import { useRouter } from 'next/router'

export const CurrentUserContext = createContext<CurrentUser>({id: 0, token: "", name: "", email: ""})

const SignUpForm = (): JSX.Element => {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password1, setPassword1] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [currentUser, setCurrentUser] = useState<CurrentUser>({id: 0, token: "", name: "", email: ""})
  const [consent, setConsent] = useState<boolean>(false)

  const params: User = {
    name: name,
    email: email,
    password: password1
  }

  const router = useRouter();
  const [invalidFlash, setInvalidFlash] = useState<boolean>(false)

  const ExecSignUp = () => {
    axios.post(`${process.env.BACKEND_URL}/signup`, params)
    .then((response) => {
      setCurrentUser({id: response.data.user_id, token: response.data.token, name: name, email: email})
      localStorage.setItem('current_user',JSON.stringify({user_id: response.data.user_id, token: response.data.token, name: name, email: email}))
      router.push({
        pathname: '/',
        query: { after_login: 'true' }
     })
    })
    .catch((error) => {
      console.log(error)
      setInvalidFlash(true)
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
            <div className="container has-text-centered">
              <div className="column is-4 is-offset-4">
                {invalidFlash && <div className="notification is-danger">
                <button className="delete" onClick={() => setInvalidFlash(false)}></button>
                  入力された情報に誤りがあります。
                </div>}
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
                        <input type="checkbox" onClick={() => setConsent(!consent)} />
                        <a>規約</a>に同意します。
                      </label>
                    </div>
                  </div>

                  <div className="columns is-centered confirm-buttons">
                    <SubmitButton 
                      onClick={ExecSignUp}
                      disabled={!name || !email || !password1 || !password2 || !consent || password1 !== password2}
                    >
                    </SubmitButton>
                    <div className="control" id="cancel-button">
                      <button className="button is-link is-light">キャンセル</button>
                    </div>
                  </div>
                </div>                
              </div>
            </div>
            <style jsx>{`
              h1 {
                font-size: 150%;
                font-weight: bold;
              }
              .confirm-buttons {
                margin-top: 20px;
              }
              #cancel-button {
                margin-left: 10px;
              }
            `}</style>
          </>
        }
      </Layout>
    </CurrentUserContext.Provider>
  )
}

export default SignUpForm
