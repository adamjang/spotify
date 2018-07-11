import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// # Views
import Player from '../../containers/player'

// # Utils
import SpotifyInstance from '../../utils/spotify'

// # CSS
import './index.css'

class LoggedIn extends Component {
  constructor() {
    super()

    this.state = {
      items: []
    }

    this.spotifyApi = new SpotifyInstance()

    this.spotifyApi.getMyTopTracks().then(tracks => this.setState({ items: tracks.items }))

    this.onItemClick = this.onItemClick.bind(this)
  }

  onItemClick(e, uri) {
    e.preventDefault()

    // # Set Device ID to current "device" (spotify connect device)
    this.spotifyApi.play({
      uris: [uri],
      device_id: this.props.spotify.deviceId
    })
  }

  render() {
    console.log('this.state.items', this.state.items)
    return (
      <div className="app-wrapper">
        <header className="app-header app-content app-content--full">
          <a className="app-loggedin-logo" href="https://spotify.com">
            Spotify
          </a>
          <a className="" href="/">
            Log Out
          </a>
        </header>
        <div className="app-content app-content--full">
          <h2 className="app-page__title">Top Songs</h2>
          <div className="app-grid">
            {this.state.items.map((item, i) => {
              return (
                <div className="app-grid__item" key={i}>
                  <div className="app-grid__thumbnailwrapper">
                    <div
                      className="app-grid__thumbnail"
                      style={{
                        backgroundImage: `url(${item.album.images[0].url})`
                      }}
                    />
                  </div>
                  <div className="app-grid__meta">
                    <h4 className="app-grid__title">{item.name}</h4>
                    <h4>{item.artists.map(artist => artist.name).join(', ')}</h4>
                    <a href="#" onClick={e => this.onItemClick(e, item.uri)}>Play</a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Player token={this.props.token} />
      </div>
    )
  }
}



LoggedIn.defaultProps = {
  loginUrl: '/',
  token: null
}

LoggedIn.propTypes = {
  loginUrl: PropTypes.string,
  token: PropTypes.string
}

export default connect(
  state => ({
    spotify: state.spotify
  })
)(LoggedIn)
