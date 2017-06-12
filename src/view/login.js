import React from 'react'
import PropTypes from 'prop-types'
import Margined from '../styled/margined'

const Login = ({ onLogin }) => {
  let usernameElement

  const handleSubmit = event => {
    event.preventDefault()
    onLogin(usernameElement.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Margined className="mdc-form-field">
        <div className="mdc-textfield">
          <input
            type="text"
            id="username"
            name="username"
            className="mdc-textfield__input"
            placeholder="Last.fm username"
            ref={node => { usernameElement = node }}
          />
        </div>
      </Margined>
      <Margined className="mdc-form-field">
        <button type="submit" className="mdc-button mdc-button--raised">
          Login
        </button>
      </Margined>
    </form>
  )
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default Login
