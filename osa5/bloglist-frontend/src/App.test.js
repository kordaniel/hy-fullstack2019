import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')

import App from './App'

describe('<App />', () => {
  it('If no user logged, only render login', async () => {
    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('log in to application')
    )

    expect(component.container).toHaveTextContent('log in to application')
    expect(component.container).toHaveTextContent('käyttäjätunnus')
    expect(component.container).toHaveTextContent('salasana')
    expect(component.container).not.toHaveTextContent('blogs')
  })
})

describe('<App /> with logged in user', () => {
  it('Blogs render correctly when user is logged in', async () => {

    const user = {
      name: 'First User',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVuZG9zIiwiaWQiOiI1YzZhMjcxMGE3MjVjYzI0NGIwYTk1MTUiLCJpYXQiOjE1NTA5Nzg3NjV9.bP6Dv14dnXNRViB2yPOQlOoroUfVSD-5vDwvm86y1XU',
      username: 'undos'
    }


    //const user = {
    //  username: 'undos',
    //  name: 'First User',
    //  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVuZG9zIiwiaWQiOiI1YzZhMjcxMGE3MjVjYzI0NGIwYTk1MTUiLCJpYXQiOjE1NTA5Nzk2NjR9.BKP66F5Ucol_tAgoAGrXYro63ZTFiI6aYCOg7HFjZm4'
    //}

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)
    await waitForElement(
      () => component.getByText('First User logged in')
    )

    expect(component.container).toHaveTextContent('First User logged in')

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent('First Testblog 1')
    expect(component.container).toHaveTextContent('First Testblog 2')
    expect(component.container).toHaveTextContent('Third Testblog3')
  })
})