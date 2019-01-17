import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

const Header = (props) => (
  <>
  <h1>{props.course.name}</h1>
  </>
)

const Part = (props) => {
  //console.log('Propsit: ', props)
  return (
    <>
      <p>{props.part.name} {props.part.exercises}</p>
    </>
  )
}

const Content = (props) => {
  //console.log('Propsit: ', props)
  return (
    <>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </>
  )
}

const Total = (props) => (
  <>
    <p>yhteensä {props.course.parts[0].exercises 
      + props.course.parts[1].exercises 
      + props.course.parts[2].exercises} tehtävää</p>
  </>
)

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  //console.log(course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
