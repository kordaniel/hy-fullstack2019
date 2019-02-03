//import React, { Component } from 'react';
import React, { useState } from 'react';
//import logo from './logo.svg';
//import './App.css';

//const Person = ({name}) => (<div>{name}</div>)
const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '045-123456'
    },
    {name: 'Martti Tienari', number: '040-123456'},
    {name: 'Arto Järvinen', number: '050-123456'},
    {name: 'Lea Kutvonen', number: '040-654321'}
  ])
  const [newName, setNewName] = useState('Edit to add a new person...')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (newPerson.name === '' || newPerson.number === '') {
      alert('Täytäthän molemmat kentät')
      return
    }
    
    if (persons.map(p => p.name).includes(newPerson.name)) {
      alert(`${newPerson.name} on jo luettelossa`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    
    setNewName('')
    setNewNumber('')
  }

  const handleFormNameChange = (event) => (setNewName(event.target.value))
  const handleFormNumberChange = (event) => (setNewNumber(event.target.value))
  const handleFormFilterChange = (event) => (setFilter(event.target.value.toLowerCase()))

  const rows = () => personsToShow.map(person => 
    <div key={person.name}>{person.name} {person.number}</div>
  )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä <input
                            value={filter}
                            onChange={handleFormFilterChange}
                          />
      </div>
      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input 
                  value={newName}
                  onChange={handleFormNameChange}
                />
        </div>
        <div>
          numero: <input 
                    value={newNumber}
                    onChange={handleFormNumberChange}
                  />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
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
