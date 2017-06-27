import React, { Component } from 'react'
import styled from 'styled-components'
import 'isomorphic-fetch'

import media from './media'
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

const OpenExternallyIcon = () => (
  <svg fill="#eeeeee" height="20" viewBox="0 0 24 24" width="20" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
  </svg>
)

const OpenExternally = styled.a`
  display: none;
  position: absolute;
  right: .5rem;
  top: .5rem;

  @media all and (display-mode: standalone) {
    display: inline-block;
  }
`

class App extends Component {
  state = {
    username: window.location.pathname.slice(1) || getUsername() || null
  }

  handleLogin = username => {
    this.setState({ username })
    window.history.replaceState(username, 'Now Playing Page', `/${username}`)
    setUsername(username)
  }

  handleLogout = () => {
    this.setState({ username: null })
    window.history.replaceState(null, 'Login Page', '/')
    clearUsername()
  }

  render = () => (
    <div>
      <OpenExternally
        href={window.location.href}
        target="_blank"
        rel="noreferrer noopener"
      ><OpenExternallyIcon /></OpenExternally>
      <Heading className="mdc-elevation--z7">Now Playing</Heading>
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
