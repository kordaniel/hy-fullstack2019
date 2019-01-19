import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
  const total = (good + neutral + bad)
  const average = (good - bad) / total
  const positive = (good / total * 100) + ' %'
  
  if (total === 0) {
    return (
      <div>
        <h1>Statistiikka</h1>
        <p>Ei yhtään palautetta annettu</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistiikka</h1>
      <table>
        <tbody>
          <Statistic text={'hyvä'} value={good} />
          <Statistic text={'neutraali'} value={neutral} />
          <Statistic text={'huono'} value={bad} />
          <Statistic text={'yhteensä'} value={total} />
          <Statistic text={'keskiarvo'} value={average} />
          <Statistic text={'positiivisia'} value={positive} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good +1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  
  return (
    <div>
      <h1>Anna palautetta</h1>
      <Button handleClick={handleGood} text='hyvä' />
      <Button handleClick={handleNeutral} text='neutraali' />
      <Button handleClick={handleBad} text='huono' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);