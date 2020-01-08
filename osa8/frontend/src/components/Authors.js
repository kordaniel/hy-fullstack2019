import React, { useState } from 'react'

const Authors = ({show, result, editAuthor}) => {
  const [editAuthorName, setEditAuthorName] = useState('')
  const [editAuthorBornYear, setEditAuthorBornYear] = useState('')

  if (!show) {
    return null
  } else if (result.loading) {
    return <div>Loading authors...</div>
  }
  
  const authors = result.data.allAuthors
  
  const submit = async (e) => {
    e.preventDefault()
    
    await editAuthor({
      variables: { name: editAuthorName, setBornTo: Number(editAuthorBornYear) }
    })

    setEditAuthorName('')
    setEditAuthorBornYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={(e) => {
          if ('' !== editAuthorName) {
            submit(e)
          }
        }
      }>
        <div>
            Select Author:
            <select defaultValue='defDisVal' onChange={({ target }) => setEditAuthorName(target.value)}>
              <option disabled value='defDisVal'>Select author</option>
              {authors.map(a =>
                <option key={a.id} value={a.name}>{a.name}</option>
              )}
            </select>
        </div>
        <div>
          Born:
          <input
            type='number'
            value={editAuthorBornYear}
            onChange={({ target }) => setEditAuthorBornYear(target.value)}
            required
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors