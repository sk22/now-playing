import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Recents from '../components/recents'
import RightLeft from '../styled/right-left'

const Margin = styled.div`
  margin-bottom: 1rem;
`

const LoggedIn = ({ username, onLogout }) => (
  <div>
    <Margin>
      <RightLeft>
        <span>Logged in as {username}</span>
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
