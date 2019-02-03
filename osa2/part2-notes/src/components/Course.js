import React from 'react'

const Header = (props) => {
  //console.log('header: ', props)
  return (
    <>
      <h2>{props.course.name}</h2>
    </>
  )
}
 
const Part = (props) => {
  //console.log('part: ', props)
  return (
    <>
      {props.part.name} {props.part.exercises}
    </>
  )
}
 
const Content = (props) => {
  //console.log('content: ', props)
  const rows = () =>
    props.course.parts.map(
      part => <p key={part.id}><Part part={part} /></p>)
  
  
  return (
    <>
      {rows()}
    </>
  )
}
 
const Total = (props) => {
  /*
  let yht = 0
  props.course.parts.forEach(value => {
    //console.log('total', value.exercises)
    yht += value.exercises
  })*/
  //const partsExercises = props.course.parts.map(course => course.exercises)
  //const reducer = (acc, cur) => acc + cur
  const total = props.course.parts.reduce(
    (acc, cur) => acc + cur.exercises, 0)
  //console.log('yht: ', total)
  return (
    <p>yhteensä {total} tehtävää</p>
  )
}

const Course = (props) => {
  //console.log('course: ', props)
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

export default Course