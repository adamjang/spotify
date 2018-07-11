import React, { Component } from 'react'

// # Views
import Login from '../../pages/login'
import LoggedIn from '../../pages/app'

// # Utils
import SpotifyInstance from '../../utils/spotify'

// # CSS
import './index.css'

// # Spotify settings
const authEndpoint = 'https://accounts.spotify.com/authorize'
const client_id = '15241f968afe4a838fa14515c3fc3cc4'
const redirect_uri = 'http://localhost:3001'
const scopes = [
  // 'user-follow-modify',
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-birthdate',
  'user-read-email',
  'user-read-private',
  'user-read-recently-played',
  'user-top-read',
  'streaming'
]

// # Spotify Web SDK settings
// const spotifyAccessToken = 'BQCKBidLSQnMK9JxKOLB2JaIjaDbTrG7VliYcM5-YmZUANHMrqRcVERyY85TteS-zZ2aNfCKeVP37Y0zdAUv-yupixE3OJJcPbbJmd7w9eI-3UnZzr5vNwlVHHbTwa7WvDiErnDJuZfMRMbGMxjkCvoDxMOauu-TnLw'


class App extends Component {

  constructor() {
    super()

    const accessToken = this.readHash()
    if(accessToken) {
      const spotifyApi = new SpotifyInstance()
      // # For Web API lib
      spotifyApi.setAccessToken(accessToken)
    }

    this.state = {
      loggedIn: accessToken ? true : false,
      token: accessToken // TODO - Save in redux
    }
  }

  readHash() {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=')
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})

    // # Reset hash
    // window.location.hash = ''

    return hash.access_token
  }

  render() {
    let loginParams = {
      client_id,
      redirect_uri,
      scope: scopes.join('%20'),
      response_type: 'token'
    }

    // # Convert to string
    loginParams = Object.keys(loginParams).map(key => key + '=' + loginParams[key]).join('&')

    const loginUrl = `${authEndpoint}?${loginParams}`

    const wrapperClasses = ['app']

    if(this.state.loggedIn) wrapperClasses.push('app--loggedin')

    return (
      <div className={`${wrapperClasses.join(' ')}`}>
        {(this.state.loggedIn) ?
          <LoggedIn token={this.state.token} /> :
          <Login loginUrl={loginUrl} />
        }
      </div>
    )
  }
}

export default App
