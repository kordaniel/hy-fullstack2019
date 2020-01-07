import React, { useState } from 'react'
import Authors from './components/Authors'
import Books   from './components/Books'
import NewBook from './components/NewBook'

import { Query } from 'react-apollo'
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

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Query query={ALL_AUTHORS}>
        {(result) => {
          if ( result.loading ) {
            return <div>Loading authors...</div>
          }
          
          return (
              <Authors
                show={page === 'authors'}
                allAuthors={result.data.allAuthors}
              />
          )
        }}
      </Query>

      <Query query={ALL_BOOKS}>
        {(result) => {
          if ( result.loading ) {
            return <div>Loading books...</div>
          }

          return (
            <Books
              show={page === 'books'}
              allBooks={result.data.allBooks}
            />
          )
        }}
      </Query>
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
