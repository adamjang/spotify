import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Controls extends Component {
  constructor() {
    super()

    this.onControl = this.onControl.bind(this)
    this.renderHtml = this.renderHtml.bind(this)
  }

  onControl(type = null) {
    const { player, track } = this.props

    // # Run SDK Function
    if(track && player && type) player[type]()
  }

  renderHtml() {
    const { track } = this.props
    // const currentTrack = track.track_window.current_track
    const playpause = (track && !track.paused) ? 'fa-pause' : 'fa-play'

    return (
      <div className="app-player__controls">
        <button
          className="app-player__button fas fa-step-backward"
          onClick={() => this.onControl('previousTrack')}
          title="previous" />
        <button
          className={`app-player__button app-player__button--circle fas ${playpause}`}
          onClick={() => this.onControl('togglePlay')}
          title="play" />
        <button
          className="app-player__button fas fa-step-forward"
          onClick={() => this.onControl('nextTrack')}
          title="next" />
      </div>
    )
  }

  render() {
    return this.renderHtml()
  }
}



Controls.defaultProps = {
  player: null,
  track: {}
}

Controls.propTypes = {
  player: PropTypes.object,
  track: PropTypes.object
}

export default Controls
