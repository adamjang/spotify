import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CurrentTrack extends Component {
  constructor() {
    super()

    this.convertTime = this.convertTime.bind(this)
    this.renderHtml = this.renderHtml.bind(this)
  }

  convertTime(ms) {
    const time = new Date(ms)
    const hours = time.getUTCHours()
    const minutes = time.getUTCMinutes()
    const seconds = time.getUTCSeconds()

    let newTime = `${minutes}:${seconds}`
    if(hours !== 0) `${hours}:${newTime}`

    return newTime
  }

  renderHtml() {
    const track = this.props.track
    const currentTrack = track.track_window.current_track
    return (
      <div className="app-player__track">
        {currentTrack.album.images && currentTrack.album.images[1] ? (
          <img className="app-player__thumbnail" src={currentTrack.album.images[1].url} />
        ) : null}
        <div className="app-player__meta">
          <h3>{currentTrack.name}</h3>
          <h4>{currentTrack.artists.map(artist => artist.name).join(', ')}</h4>
          <h4>{`${this.convertTime(track.position)} / ${this.convertTime(track.duration)}`}</h4>
        </div>
      </div>
    )
  }

  render() {
    return (this.props.track.track_window.current_track) ? this.renderHtml() : null
  }
}



CurrentTrack.defaultProps = {
  track: null
}

CurrentTrack.propTypes = {
  track: PropTypes.object
}

export default CurrentTrack
