import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks/index'

const LoginFormNoHistory = (props) => {
  const { reset: clearUsername, ...username } = useField('text')
  const { reset: clearPassword, ...password } = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()
    props.loginUser(username.value, password.value)
    clearUsername()
    clearPassword()
    props.history.push('/')
  }

  return (
    <div className='login'>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          käyttäjätunnus
          <input { ...username } />
        </div>
        <div>
          salasana
          <input { ...password } />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

const LoginForm = withRouter(LoginFormNoHistory)

const mapDispatchToProps = {
  loginUser
}

const ConnectedLoginForm = connect(
  null,
  mapDispatchToProps
)(LoginForm)

export default ConnectedLoginForm