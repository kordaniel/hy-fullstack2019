//import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

//const Person = ({name}) => (<div>{name}</div>)
const Filter = ({filter, handlerer}) => (
  <div>
    rajaa näytettäviä <input 
                        value={filter}
                        onChange={handlerer}
                      />
  </div>
)

const PersonForm = ({addPerson, newName, nameHandlerer, newNumber, numberHandlerer}) => (
  <form onSubmit={addPerson}>
        <div>
          nimi: <input 
                  value={newName}
                  onChange={nameHandlerer}
                />
        </div>
        <div>
          numero: <input 
                    value={newNumber}
                    onChange={numberHandlerer}
                  />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
)

const Persons = ({persons}) => (
  persons.map(p => <div key={p.name}>{p.name} {p.number}</div>)
)

const App = () => {
  /*
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '045-123456'
    },
    {name: 'Martti Tienari', number: '040-123456'},
    {name: 'Arto Järvinen', number: '050-123456'},
    {name: 'Lea Kutvonen', number: '040-654321'}
  ])*/
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Edit to add a new person...')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter))
    //filter is always lowercase, handleFormFilterChange lowercases all filters

    useEffect(() => {
      //console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(res => setPersons(res.data))
    }, [])
    /*
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }
  useEffect(hook, [])
  */
  //console.log('render', persons.length, 'persons')
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
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log('tallennett', response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      
    }
    
    
  }

  const handleFormNameChange = (event) => (setNewName(event.target.value))
  const handleFormNumberChange = (event) => (setNewNumber(event.target.value))
  const handleFormFilterChange = (event) => (setFilter(event.target.value.toLowerCase()))

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter filter={filter} handlerer={handleFormFilterChange} />
      <h3>Lisää uusi</h3>
      <PersonForm addPerson={addPerson}
                  newName={newName}
                  nameHandlerer={handleFormNameChange}
                  newNumber={newNumber}
                  numberHandlerer={handleFormNumberChange} />
      <h3>Numerot</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App;
