import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import usersService from '../services/users'

const Users = () => {
  //TEHTÄVÄ 7.7 KESKEN!!!!!
  const [users, setUsers] = useState([])

  useEffect(async () => {
    const all = await usersService.getAll()
    setUsers(all)
    //setUsers([{id: 'sadfasfsaa', name: 'undos', blogs: [{p:'sdad'},{p:'asd'}]}])
  }, [])

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

export default Users