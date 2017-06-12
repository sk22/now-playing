import React from 'react'
import PropTypes from 'prop-types'

import Track from '../components/track'
import RightLeft from '../styled/right-left'
import Margined from '../styled/margined'

const LoggedIn = ({ username, onLogout }) => (
  <div>
    <Margined>
      <RightLeft>
        <span>Logged in as <code>{username}</code></span>
        <button className="mdc-button" onClick={onLogout}>Logout</button>
      </RightLeft>
    </Margined>
    <Track username={username} />
  </div>
)

LoggedIn.propTypes = {
  username: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default LoggedIn
