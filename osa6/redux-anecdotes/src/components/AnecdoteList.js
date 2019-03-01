import React from 'react'
import { voteOnId } from '../reducers/anecdoteReducer'
import { timedNotification } from './Notification'

const AnecdoteList = (props) => {
  const { anecdotes, filter } = props.store.getState()
  const anecdotesToShow = filter === '' ? anecdotes
    : anecdotes.filter(anecdote => 
      anecdote.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = id => {
    props.store.dispatch(voteOnId(id))
    const votedAnecdote = props.store.getState()
      .anecdotes.find(a => a.id === id).content
    timedNotification(props.store, `You voted '${votedAnecdote}'`)
  }

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList