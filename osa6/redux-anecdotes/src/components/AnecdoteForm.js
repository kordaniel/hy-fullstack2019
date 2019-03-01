import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { timedNotification } from './Notification'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    props.store.dispatch(createAnecdote(anecdote))
    timedNotification(props.store, `You added '${anecdote}'`)
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

export default AnecdoteForm