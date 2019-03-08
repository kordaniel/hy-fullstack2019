import React, { useState, useEffect } from 'react'
import userService from '../services/users'

const User = ({ id }) => {
  const [user, setUser] = useState(null)
  useEffect(async () => {
    setUser(await userService.getUser(id))
  }, [])


  if (user) {
    console.log(user)
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map(b => <li key={b.id}>{b.title}</li>)}
        </ul>
      </div>
    )
  }

  return null
}

export default User