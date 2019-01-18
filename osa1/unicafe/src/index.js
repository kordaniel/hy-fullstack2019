import React, { useState } from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [average, setAverage] = useState(0)
  const [totalClicks, setTotalClicks] = useState(0)
  const handleGood = () => {
    setGood(good +1)
    setAverage(average + 1)
    setTotalClicks(totalClicks + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setTotalClicks(totalClicks + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAverage(average - 1)
    setTotalClicks(totalClicks + 1)
  }
  /*
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    average: 0,
    total: 0
  })

  const handleGood = () => 
    setClicks({
      ...clicks,
      good: clicks.good + 1,
      average: clicks.average +1,
      total: clicks.total +1
    })
    
  
  const handleNeutral = () => {
    const newClicks = {
      ...clicks,
      neutral: clicks.neutral + 1,
      total: clicks.total +1
    }
    setClicks(newClicks)
  }
  const handleBad = () => {
    const newClicks = {
      ...clicks,
      bad: clicks.bad + 1,
      average: clicks.average -1,
      total: clicks.total +1
    }
    setClicks(newClicks)
  }
  */
  return (
    <div>
      <h1>Anna palautetta</h1>
      <button onClick = {handleGood} >hyvä</button>
      <button onClick = {handleNeutral}>neutraali</button>
      <button onClick = {handleBad}>huono</button>
      <h1>Statistiikka</h1>
      <p>Hyvä {good}</p>
      <p>Neutraali {neutral}</p>
      <p>Huono {bad}</p>
      <p>yhteensä {totalClicks}</p>
      <p>keskiarvo {average / totalClicks}</p>
      <p>positiivisia {good / totalClicks * 100} %</p>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
