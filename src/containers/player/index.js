import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// # Utils
import SpotifyInstance from '../../utils/spotify'

// # CSS
import './index.css'

// # Views
import CurrentTrack from './current-track'
import CurrentTrackProgress from './current-track-progress'
import Controls from './controls'

// # Actions
import * as SpotifyActions from '../../actions/spotify'


class Player extends Component {
  constructor() {
    super()

    this.state = {
      track: null
    }

    this.spotifyApi = new SpotifyInstance()

    this.waitForSpotify = this.waitForSpotify.bind(this)
    this.setUpSpotify = this.setUpSpotify.bind(this)
    this.handleStateChange = this.handleStateChange.bind(this)

    this.player = null
    // this.spotifyApi.getMe().then(me => console.log('a', me))
  }

  async componentWillMount() {
    await this.waitForSpotify()
    await this.setUpSpotify()
    // this.spotifyApi.getMyCurrentPlayingTrack().then(me => console.log('aa', me))
  }

  async setUpSpotify() {
    // # TODO - move this to a global in webpack
    const Spotify = window.Spotify || {}
      this.player = new Spotify.Player({
        name: 'Spotify Connect',
        getOAuthToken: cb => { cb(this.props.token); }
      })

      // Error handling
      // player.addListener('initialization_error', ({ message }) => { console.error(message); })
      // player.addListener('authentication_error', ({ message }) => { console.error(message); })
      // player.addListener('account_error', ({ message }) => { console.error(message); })
      // player.addListener('playback_error', ({ message }) => { console.error(message); })

      // // Playback status updates
      // player.addListener('player_state_changed', state => { console.log('pppp', state); })

      // // Ready
      this.player.addListener('ready', ({ device_id }) => {
        this.props.dispatch(SpotifyActions.setDevice(device_id))
        console.log('Ready with Device ID', device_id);
      })

      // // Not Ready
      // player.addListener('not_ready', ({ device_id }) => {
      //   console.log('Device ID has gone offline', device_id);
      // })


      this.player.on('player_state_changed', async state => await this.handleStateChange(state))

      // player.on('ready', state => {
      //   console.log('ready', state)
      // })

      // Connect to the player!
      this.player.connect()

      this.player.setName('Spotify Connect - adam')

      // player.getCurrentState().then(state => {
      //   if (!state) {
      //     console.error('User is not playing music through the Web Playback SDK');
      //     return;
      //   }

      //   let {
      //     current_track,
      //     next_tracks: [next_track]
      //   } = state.track_window;

      //   console.log('Currently Playing', current_track);
      //   console.log('Playing Next', next_track);
      // })
  }

  waitForSpotify() {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve()
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => { resolve() }
      }
    })
  }

  handleStateChange(track) {
    this.setState({ track })
    console.log('state change', track)
  }

  render() {
    const { track } = this.state
    return (
      <div className="app-player">
        <div className="app-player__container">
          <div className="app-player__progress">
            { (track) ? <CurrentTrackProgress track={track} /> : null}
          </div>
          <div className="app-player__left">
            { (track && track.track_window) ? <CurrentTrack track={track} /> : null}
          </div>
          <div className="app-player__center">
            <Controls player={this.player} track={track} />
          </div>
          <div className="app-player__right">
            right
          </div>
        </div>
      </div>
      )
  }
}



Player.defaultProps = {
  token: null
}

Player.propTypes = {
  token: PropTypes.string
}

export default connect(
  state => ({
    spotify: state.spotify
  })
)(Player)
