import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Track from './track'
import IndeterminateProgressBar from '../components/indeterminate-progress-bar'

const apiKey = '320218989245c163110e04e6a64bb8b3'
const getRecentTracksURL = (user, limit = 1) =>
  'https://ws.audioscrobbler.com/2.0/'
  + `?method=user.getrecenttracks&user=${user}&api_key=${apiKey}`
  + `&format=json&limit=${limit}`

class Recents extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired
  }

  state = {
    recents: null,
    image: null
  }

  componentDidMount = async () => {
    const res = await fetch(getRecentTracksURL(this.props.username, 1))
    const json = await res.json()
    this.setState({ recents: json.recenttracks.track })
  }

  render = () => (this.state.recents ? (
    <div>
      <Track
        current
        username={this.props.username}
        track={this.state.recents[0]}
      />
      {this.state.recents.length > 1 && (
        <Played>{this.state.recents.slice(1).map(track => (
          <Track
            username={this.props.username}
            track={track}
            key={this.state.recents.indexOf(track)}
          />
        ))}</Played>
      )}
    </div>
  ) : (
    <IndeterminateProgressBar />
  ))
}

const Played = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  > * + * {
    margin-top: 1rem;
  }
`

export default Recents
