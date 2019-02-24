import React from 'react'
import 'jest-dom/extend-expect'
//import { render, cleanup } from 'react-testing-library'
import { render } from 'react-testing-library'
import Simpleblog from './Simpleblog'

//afterEach(cleanup) //this is configured in ../setupTests.js

test('renders content', () => {
  const blog = {
    title: 'Testaus Blogi',
    author: 'Testi Testaaja',
    url: 'http://www.lyhytmuttapitka.osoite.com/',
    likes: 2
  }

  const component = render(
    <Simpleblog blog={blog} />
  )

  expect(component.container).toHaveTextContent('Testaus Blogi')
  expect(component.container).toHaveTextContent('Testi Testaaja')
  //const element = component.getByText('Testi Testaaja')
  //expect(element).toBeDefined()

  const blogDiv = component.container.querySelector('.likes')
  expect(blogDiv).toHaveTextContent('2')
  //component.debug()
})