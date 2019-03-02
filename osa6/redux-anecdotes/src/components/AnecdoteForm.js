import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.persist()
    event.preventDefault()

    const content = event.target.anecdote.value
    const newAnecdote = await anecdoteService.createNew(content)
    props.createAnecdote(newAnecdote)

    props.notificationChange(`You added '${newAnecdote.content}'`)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  { createAnecdote,
  notificationChange }
)(AnecdoteForm)