import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  const selectedUser = props.users.find(u => u.id === props.id)
  if (!selectedUser) return null

  return (
    <div>
      <h2>{selectedUser.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {selectedUser.blogs.length === 0
          ? <li>User has not added any blogs</li>
          : selectedUser.blogs.map(b => <li key={b.id}>{b.title}</li>)}
      </ul>
    </div>
  )
}

//tama pitaa viela refaktoroida niin etta tulee vain yksi (valittu)kayttaja
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const ConnectedUser = connect(mapStateToProps)(User)
export default ConnectedUser