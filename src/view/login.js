import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TextField = styled.input`
  width: 100%;
  margin-right: 1rem;
`

const Flex = styled.div`
  display: flex;
`

const Login = ({ onLogin }) => {
  let usernameElement

  const handleSubmit = event => {
    event.preventDefault()
    onLogin(usernameElement.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex className="mdc-textfield">
        <TextField
          type="text"
          id="username"
          name="username"
          className="mdc-textfield__input"
          placeholder="Last.fm username"
          innerRef={node => { usernameElement = node }}
        />
        <button type="submit" className="mdc-button mdc-button--raised">
          Login
        </button>
      </Flex>
    </form>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default Login
