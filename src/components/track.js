import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Share from '../components/share'
import emptyAlbumArt from '../assets/empty-album-art.svg'

const load = async url => (await fetch(url)).blob()

const trackPropType = PropTypes.shape({
  name: PropTypes.string,
  artist: PropTypes.shape({
    '#text': PropTypes.string
  }),
  url: PropTypes.string,
  image: PropTypes.arrayOf(PropTypes.shape({ '#text': PropTypes.string }))
})

class Track extends Component {
  static propTypes = {
    track: trackPropType.isRequired,
    current: PropTypes.bool
  }

  static defaultProps = {
    current: false
  }

  state = {
    image: null
  }

  componentDidMount = async () => {
    const urls = this.props.track.image
      .map(image => image['#text'])
      .filter(Boolean)

    this.progressivelyLoadImage(urls)
  }

  progressivelyLoadImage = urls => {
    if (!urls.length) return
    const firstURL = urls[0]
    const lastURL = urls[urls.length - 1]

    const updateAndRender = url => this.state.image !== lastURL
      && this.setState({ image: url }, this.render)

    load(firstURL).then(() => updateAndRender(firstURL))

    if (urls.length > 1) {
      load(lastURL).then(() => updateAndRender(lastURL))
    }

    // let iteration = 0
    // urls.forEach(async (url, i) => {
    //   await load(url)
    //   if (i < iteration) return
    //   iteration = i
    //   this.setState({ image: url })
    //   this.render()
    // })
  }

  render = () => (
    <TrackView
      track={this.props.track}
      image={this.state.image}
      big={this.props.current}
    />
  )
}

const StyledTrack = styled.div`
  display: flex;
  ${({ big }) => `flex-direction: ${big ? 'column' : 'row'};`}
  ${({ big }) => big || 'height: 8rem;'}
`

const AlbumArt = styled.img`
  ${({ big }) => `${big ? 'width' : 'height'}: 100%;`}
`

const Link = styled.a`
  ${({ big }) => `${big ? 'width' : 'height'}: 100%;`}
`

const Title = styled.span`
  display: inline-block;
  margin-bottom: 1rem;
`

const TrackText = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
`

const TrackView = ({ track, image, big }) => (
  <StyledTrack big={big} className="mdc-elevation--z5">
    <Link href={track.url} target="_blank" rel="noopener noreferrer">
      <AlbumArt big={big} src={image || emptyAlbumArt} />
    </Link>
    <TrackText>
      <Title>
        {track.artist['#text']} – {track.name}
      </Title>
      <Share track={track} />
    </TrackText>
  </StyledTrack>
)

TrackView.propTypes = {
  track: trackPropType.isRequired,
  image: PropTypes.string,
  big: PropTypes.bool
}

TrackView.defaultProps = {
  image: null,
  big: false
}

export default Track
