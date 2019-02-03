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
  let yht = 0
  props.course.parts.forEach(value => {
    //console.log('total', value.exercises)
    yht += value.exercises
  })
  //console.log('yht: ', yht)
  return (
    <p>yhteensä {yht} tehtävää</p>
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