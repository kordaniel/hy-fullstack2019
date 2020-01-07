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
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={editAuthorName}
            onChange={({ target }) => setEditAuthorName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={editAuthorBornYear}
            onChange={({ target }) => setEditAuthorBornYear(target.value)}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors