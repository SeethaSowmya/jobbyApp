import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './login.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errMessage: ''}

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailure = msg => {
    this.setState({showError: true, errMessage: msg})
  }

  submition = async event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log(username)
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  onchangePassword = event => {
    this.setState({password: event.target.value})
  }

  onchangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showError, errMessage} = this.state
    return (
      <div className="container">
        <form className="form" onSubmit={this.submition}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
          <div className="inputContainer">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              className="input"
              type="text"
              id="username"
              onChange={this.onchangeUsername}
              value={username}
              placeholder="Username"
            />
          </div>
          <br />
          <div className="inputContainer">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              className="input"
              type="password"
              id="password"
              onChange={this.onchangePassword}
              value={password}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          {showError && <p className="errMsg">{errMessage}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
