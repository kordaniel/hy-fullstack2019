import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = (props) => {
  const n = props.anecdotes.length
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(n).fill(0))
  
  
  const handleClickNext = () => {
    setSelected(Math.floor(Math.random() * n))
  }
  
  const handleClickVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  //console.log(votes)
  return (
    <div>
      <button onClick={handleClickVote}>Äänestä</button>
      <button onClick={handleClickNext}>Arvo uusi</button>
      <p>{props.anecdotes[selected]}</p>
      <p>on saanut {votes[selected]} ääntä</p>
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
