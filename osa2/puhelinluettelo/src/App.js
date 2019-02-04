import React, { useState, useEffect } from 'react';
import personService from './services/persons'
//import './index.css'
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

const Persons = ({persons, handleClick}) => (
  persons.map(
    p => <div key={p.name}>{p.name} {p.number} 
        <button onClick={() => handleClick(p.id, p.name)}>poista</button></div>)
)

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ErrorNotification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
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
    
    const existingPerson = persons.find(p => p.name === newPerson.name)
    //if (persons.map(p => p.name).includes(newPerson.name)) {
    if (existingPerson !== undefined) {
      if (window.confirm(`${newPerson.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const updatedPerson = {...existingPerson, number: newPerson.number}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id
                                            ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            showNotification(`Päivitettiin ${returnedPerson.name} tietoja`)
          })
          .catch(error => {
            showErrorMessage(`Tapahtui virhe, ${existingPerson.name} ei voitu päivittää`)
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          showNotification(`Lisättiin ${returnedPerson.name} luetteloon`)
        })
        .catch(error => {
          showErrorMessage(`Tapahtui virhe, ${newPerson.name} ei lisätty`)
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
        showNotification(`Poistettiin ${name} luettelosta`)
      })
      .catch(error => {
        showErrorMessage(`Tapahtu virhe, ${name} ei voitu poistaa`)
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const showNotification = message => {
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const showErrorMessage = message => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleFormNameChange = (event) => (setNewName(event.target.value))
  const handleFormNumberChange = (event) => (setNewNumber(event.target.value))
  const handleFormFilterChange = (event) => (setFilter(event.target.value.toLowerCase()))

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={notificationMessage} />
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
