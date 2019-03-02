import React from 'react'
import { connect } from 'react-redux'
import { voteOnId } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = id => {
    const anecdote = props.visibleAnecdotes.find(a => a.id === id)
    props.voteOnId(anecdote)
    const votedAnecdote = props.visibleAnecdotes.find(a => a.id === id).content
    props.setNotification(`You voted '${votedAnecdote}'`, 10)
  }

  return (
    <div>
      {props.visibleAnecdotes.map(anecdote =>
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

const anecdotesToShow = ({anecdotes, filter}) => {
  return filter === '' 
          ? anecdotes
          : anecdotes.filter(anecdote => 
            anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteOnId,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
