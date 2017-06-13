import React, { Component } from 'react'
import styled from 'styled-components'
import 'isomorphic-fetch'

import { media } from './style-utils'
import { getUsername, setUsername, clearUsername } from './storage'

import Login from './view/login'
import LoggedIn from './view/logged-in'

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;

  ${media.desktop`
    width: 40rem;
  `}
`

const Heading = styled.h1`
  font-size: 1.8rem;
  text-transform: uppercase;
  letter-spacing: .3rem;
  background-color: #3F51B5;
  color: white;
  text-align: center;
  margin: 0;
  padding: 2rem;
`

class App extends Component {
  state = {
    username: getUsername() || null
  }

  handleLogin = username => {
    this.setState({ username })
    setUsername(username)
  }

  handleLogout = () => {
    this.setState({ username: null })
    clearUsername()
  }

  render = () => (
    <div>
      <Heading className="mdc-elevation--z7">now playing</Heading>
      <Container>
        {this.state.username ? (
          <LoggedIn
            username={this.state.username}
            onLogout={this.handleLogout}
          />
        ) : (
          <Login onLogin={this.handleLogin} />
        )}
      </Container>
    </div>
  )
}

export default App