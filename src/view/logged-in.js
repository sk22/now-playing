import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Recents from '../components/recents'
import RightLeft from '../styled/right-left'

const Margin = styled.div`
  margin-bottom: 1rem;
`

const Link = styled.a`
  color: #1A237E;
  text-decoration: none;
  font-weight: bold;
`

const getProfileURL = username => `https://last.fm/user/${username}`

const LoggedIn = ({ username, onLogout }) => (
  <div>
    <Margin>
      <RightLeft>
        <span>
          Logged in as{' '}
          <Link
            href={getProfileURL(username)}
            target="_blank"
            rel="noopener noreferrer"
          >{username}</Link>
        </span>
        <button className="mdc-button" onClick={onLogout}>Logout</button>
      </RightLeft>
    </Margin>
    <Recents username={username} />
  </div>
)

LoggedIn.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default LoggedIn
