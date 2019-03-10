import React        from 'react'
import { connect }  from 'react-redux'

const User = ({ userById }) => {
  if (!userById) return null

  return (
    <div>
      <h2>{userById.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userById.blogs.length === 0
          ? <li>User has not added any blogs</li>
          : userById.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

const selectUserById = (users, id) => {
  return users.find(u => u.id === id)
}

const mapStateToProps = (state, ownProps) => {
  return {
    userById: selectUserById(state.users, ownProps.id)
  }
}

const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser