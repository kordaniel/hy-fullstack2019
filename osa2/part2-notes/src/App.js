import React from 'react'
import Note from './components/Note'
import Course from './components/Course'

//const App = ({ notes }) => {
const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10,
        id: 1
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7,
        id: 2
      },
      {
        name: 'Komponenttien tila',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 7,
        id: 4
      }
    ]
  }

  
  //console.log('app: ', course)
  return (
    <div>
      <Course course={course} />
    </div>
  )
  //const rows = () => notes.map(note =>
  //  <Note
  //    key={note.id}
  //    note={note}
  //  />
  //)
/*
  return (
    <div>
      <h1>Muistiinpanot</h1>
      <ul>
        {rows()}
      </ul>
    </div>
  )
*/
}

export default App
