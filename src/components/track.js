import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Share from '../components/share'
import { getLastTruthy } from '../util'

import emptyAlbumArt from '../assets/empty-album-art.svg'

const apiKey = '320218989245c163110e04e6a64bb8b3'
const url = user => 'https://ws.audioscrobbler.com/2.0/'
  + `?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json`

class Track extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  }

  state = {
    recents: null
  }

  componentDidMount = async () => {
    const res = await fetch(url(this.props.username))
    const json = await res.json()
    this.setState({ recents: json.recenttracks.track })
  }

  render = () => (
    <div>
      {this.state.recents ? (
        <TrackView
          username={this.props.username}
          track={this.state.recents[0]}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

const StyledTrack = styled.div`
  display: flex;
  flex-direction: column;
`

const AlbumArt = styled.img`
  width: 100%;
`

const Title = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
`

const TrackText = styled.div`
  padding: 1rem;
`

const getBestImage = array => getLastTruthy(array.map(image => image['#text']))

const TrackView = ({ track }) => (
  <StyledTrack className="mdc-elevation--z5">
    <a href={track.url} target="_blank" rel="noopener noreferrer">
      <AlbumArt src={getBestImage(track.image) || emptyAlbumArt} />
    </a>
    <TrackText>
      <Title>{track.artist['#text']} – {track.name}</Title>
      <Share track={track} />
    </TrackText>
  </StyledTrack>
)

TrackView.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string,
    artist: PropTypes.shape({
      '#text': PropTypes.string
    }),
    url: PropTypes.string
  }).isRequired
}

export default Track
