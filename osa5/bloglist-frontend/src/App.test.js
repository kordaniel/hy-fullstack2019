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