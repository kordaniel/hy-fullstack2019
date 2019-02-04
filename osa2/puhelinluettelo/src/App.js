import React, { useState, useEffect } from 'react';
import axios from 'axios';
import personService from './services/persons'

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

const Persons = ({persons, handleClick}) => (//{
  //console.log(persons.map(p => `${p.id}: ${p.name}`))
  //return (
  persons.map(
    p => <div key={p.name}>{p.name} {p.number} 
        <button onClick={() => handleClick(p.id, p.name)}>poista</button></div>)
//)}
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('Edit to add a new person...')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const personsToShow = filter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter))
    //filter is always lowercase, handleFormFilterChange lowercases all filters

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const deletePerson = (id, name) => {
    //console.log('deletePersonfunktio', id)
    if (!window.confirm(`Poistetaanko ${name}`)) {
      return
    }
    personService
      .remove(id)
      .then(returneddata => {
        //console.log('delete', returneddata)
        setPersons(persons.filter(p => p.id !== id))
      })
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
      <Persons persons={personsToShow} handleClick={deletePerson} />
    </div>
  )
}

export default App;
