import * as React from 'react'
import axios from 'axios'

import Layout from '../components/Layout'

const SignUp = () => {
  const ExecSignUp = () => {
    axios.post('http://localhost:8000/login'), {
      headers: {
        'Content-Type': 'application/json'
      },
    };
  }
  return (
    <>
      <Layout title="映画情報サービス">
        <div className="authentication-form">
          <div className="field">
            <h1>ユーザ登録</h1>
          </div>
          <div className="field">
            <label className="label">ユーザ名</label>
            <div className="control has-icons-left has-icons-right">
              <input className="input" type="text" placeholder="ユーザ名"></input>
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
              <input className="input" type="email" placeholder="メールアドレス"></input>
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
              <input className="input" type="password1" placeholder="パスワード"></input>
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
              <input className="input" type="password2" placeholder="パスワード（確認）"></input>
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
              <button className="button is-link" onClick={ExecSignUp}>Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
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
    </>
  )
}

export default SignUp
