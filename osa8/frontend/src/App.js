import React, { useState } from 'react'
import Authors from './components/Authors'
import Books   from './components/Books'
import NewBook from './components/NewBook'

import { Query, Mutation } from 'react-apollo'
import { gql }   from 'apollo-boost'

const ALL_AUTHORS = gql`
{
  allAuthors {
    name,
    born,
    bookCount,
    id
  }
}
`
const ALL_BOOKS = gql`
{
  allBooks {
    title,
    author,
    published,
    id
  }
}
`

const ADD_BOOK = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
    published,
    id
  }
}
`

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')

  const handleError = (error) => {
    setErrorMessage(error.graphQLErrors[0].message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => {
          return (
              <Authors
                show={page === 'authors'}
                result={result}
              />
          )
        }}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => {
          return (
            <Books
              show={page === 'books'}
              result={result}
            />
          )
        }}
      </Query>
      
      <Mutation
        mutation={ADD_BOOK}
        refetchQueries={[{ query:ALL_AUTHORS }, { query:ALL_BOOKS }]}
        onError={handleError}
      >
        {(newBook) => 
          <NewBook
            show={page === 'add'}
            newBook={newBook}
          />
        }
      </Mutation>
    </div>
  )
  
  /*
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
    
      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      
    </div>
  )*/
}
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
