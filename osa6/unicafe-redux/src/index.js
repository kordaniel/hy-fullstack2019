import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const handleNeutral = () => { store.dispatch({ type: 'OK' }) }
  const handleBad     = () => { store.dispatch({ type: 'BAD' }) }
  const handleReset   = () => { store.dispatch({ type: 'ZERO' }) }

  const total = store.getState().good
              + store.getState().ok
              + store.getState().bad
  const average = (store.getState().good - store.getState().bad) / total
  const positivePercentage = store.getState().good / total * 100

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={handleNeutral}>neutraali</button> 
      <button onClick={handleBad}>huono</button>
      <button onClick={handleReset}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
      <div>yhteensä {total}</div>
      <div>keskiarvo {average ? average : 0}</div>
      <div>positiivisia {positivePercentage ? positivePercentage : 0} %</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
