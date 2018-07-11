import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CurrentTrackProgress extends Component {
  constructor() {
    super()

    this.renderHtml = this.renderHtml.bind(this)
  }

  renderHtml() {
    const currentTrack = this.props.track
    console.log('thi', currentTrack, currentTrack.duration, (currentTrack.position / currentTrack.duration) * 100)
    const style = {
      width: `${(currentTrack.position * 100 / currentTrack.duration)}%`
    }
    return (
      <div
        className="app-player__progressbar"
        style={style} />
    )
  }

  render() {
    return (this.props.track) ? this.renderHtml() : null
  }
}



CurrentTrackProgress.defaultProps = {
  track: null
}

CurrentTrackProgress.propTypes = {
  track: PropTypes.object
}

export default CurrentTrackProgress
