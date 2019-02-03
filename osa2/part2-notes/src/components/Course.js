import React from 'react'

const Header = ({course}) => (
    <>
      <h2>{course.name}</h2>
    </>
)
 
const Part = ({part}) => (<>{part.name} {part.exercises}</>)
 
const Content = (props) => {
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
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  )
}

export default Course