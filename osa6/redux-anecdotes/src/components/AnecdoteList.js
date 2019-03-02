import React from 'react'
import { connect } from 'react-redux'
import { voteOnId } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes
  const filter = props.filter

  const anecdotesToShow = () => {
    return filter === '' 
            ? anecdotes
            : anecdotes.filter(anecdote => 
              anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    }

  const vote = id => {
    props.voteOnId(id)
    const votedAnecdote = anecdotes.find(a => a.id === id).content
    props.notificationChange(`You voted '${votedAnecdote}'`)
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote =>
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

const mapStateToProps = (state) => {
  //joskus on hyvä tulostella =>
  //console.log(state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteOnId,
  notificationChange
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
