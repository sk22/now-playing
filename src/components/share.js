import React, { Component } from 'react'
import PropTypes from 'prop-types'

const generateText = track =>
  `#nowplaying ${track.artist['#text']} – ${track.name}`
const generateURIText = track => encodeURIComponent(generateText(track))

class Share extends Component {
  static propTypes = {
    track: PropTypes.shape({
      url: PropTypes.string,
      artist: PropTypes.shape({
        '#text': PropTypes.string
      }),
      name: PropTypes.string
    }).isRequired
  }

  componentDidMount = () => window.twttr.widgets.load()

  render = () => (
    <div>
      <a
        className="twitter-share-button"
        data-url={this.props.track.url}
        href={`https://twitter.com/intent/tweet?text=${
          generateURIText(this.props.track)}`}
      >Tweet</a>
    </div>
  )
}

export default Share
