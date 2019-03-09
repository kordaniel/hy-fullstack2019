import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Users = ({ users }) => {
  const toTableRows = (u) =>
    <tr key={u.id}><td><Link to={`/users/${u.id}`}>{u.name}</Link></td><td>{u.blogs.length}</td></tr>

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr><td></td><td><strong>blogs created</strong></td></tr>
          {users.map(toTableRows)}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUsers = connect(mapStateToProps)(Users)

export default ConnectedUsers