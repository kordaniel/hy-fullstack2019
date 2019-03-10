import React            from 'react'
import { connect }      from 'react-redux'
import { withRouter }   from 'react-router-dom'
import { Form, Button } from 'semantic-ui-react'

import { loginUser } from '../reducers/userReducer'
import { useField } from '../hooks/useField'

const LoginFormNoHistory = (props) => {
  const [username, clearUsername] = useField('text')
  const [password, clearPassword] = useField('password')

  const handleLogin = (event) => {
    event.preventDefault()
    props.loginUser(username.value, password.value)
    clearUsername()
    clearPassword()
    props.history.push('/blogs')
  }

  return (
    <div className='login'>
      <h2>Log in</h2>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <label>Username</label>
          <input { ...username } />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input { ...password } />
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
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