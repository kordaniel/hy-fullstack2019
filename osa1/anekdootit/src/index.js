import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const n = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(n).fill(0))
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVotesID, setMostVotesID] = useState(0)

  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * n))
  }
  
  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] > mostVotes) {
      setMostVotes(copy[selected])
      setMostVotesID(selected)
    }
    setVotes(copy)
  }

  const notes = [
    {
      id: 1,
      content: 'HTML on helppoa',
      date: '2017-12-10T17:30:31.098Z',
      important: true,
    },
    {
      id: 2,
      content: 'Selain pystyy suorittamaan vain javascriptiä',
      date: '2017-12-10T18:39:34.091Z',
      important: false,
    },
    {
      id: 3,
      content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
      date: '2017-12-10T19:20:14.298Z',
      important: true,
    },
  ]
  const result = notes.map(note => <li key={note.id}>{note.content}</li>)
  console.log(result)
  //console.log(votes)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{props.anecdotes[selected]}</div>
      <div>on saanut {votes[selected]} ääntä</div>
      <div>
        <button onClick={handleClickVote}>Äänestä</button>
        <button onClick={handleClickNext}>Arvo uusi</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{props.anecdotes[mostVotesID]}</div>
        <div>on saanut {votes[mostVotesID]} ääntä</div>
      </div>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
