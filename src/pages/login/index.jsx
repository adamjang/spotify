import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './index.css'

class Login extends Component {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
  }

  onClick(e) {
    e.preventDefault()

    // TODO - Update this with react router
    window.location = this.props.loginUrl
  }

  render() {
    return (
      <div className="app-login">
        <div className="app-content app-content--small">
          <a className="app-login-logo" href="https://spotify.com">
          Spotify
          </a>
        </div>
        <div className="app-content app-content--small">
          <p>To get started, log in with your Spotify account.</p>
          <button className="btn" onClick={this.onClick}>Log In</button>
        </div>
      </div>
      )
  }
}



Login.defaultProps = {
  loginUrl: '/'
}

Login.propTypes = {
  loginUrl: PropTypes.string
}

export default Login
