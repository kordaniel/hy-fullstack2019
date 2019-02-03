//import React, { Component } from 'react';
import React, { useState } from 'react';
//import logo from './logo.svg';
//import './App.css';

//const Person = ({name}) => (<div>{name}</div>)
const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])
  const [newName, setNewName] = useState('Edit to add a new person...')
  
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }
    //if (persons.includes(person => person.name == newPerson.name)) {
    //ei toimi, miksi?
    if (persons.map(p => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} on jo luettelossa`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    
    setNewName('')
  }

  const handleFormChange = (event) => (setNewName(event.target.value))

  const rows = () => persons.map(person => 
    <div key={person.name}>{person.name}</div>
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input 
                  value={newName}
                  onChange={handleFormChange}
                />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {rows()}
    </div>
  )
}
/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
*/
export default App;
