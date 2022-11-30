import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
const { mongoose } = require('mongoose');
const { gql, useQuery } = require('@apollo/client');

const Book = require('./models/Book');
const Author = require('./models/Author');

const MONGODB_URI =
  'mongodb+srv://dbatson09:Coltsnmongo0108!@cluster0.7rjpnj9.mongodb.net/blog?retryWrites=true&w=majority';

const password = 'Coltsnmongo0108!';
const uri = `mongodb+srv://dbatson09:${password}@cluster0.xnuiitd.mongodb.net/?retryWrites=true&w=majority`;

// console.log('connecting to', uri);

const url =
  'mongodb+srv://dbatson09:ColtsnFSO0108@cluster0.7rjpnj9.mongodb.net/blog?retryWrites=true&w=majority';
const mongoUrl = 'mongodb://localhost/bloglist';

console.log('connecting to', url);

const MongoDB = mongoose.connect(url).connection
MongoDB.on('error', function (err) {
  console.log(err.message);
});
MongoDB.once('open', function () {
  console.log('mongodb connection open');
});
// mongoose
//   .connect(url)
//   .then(() => {
//     console.log('connected to MongoDB');
//   })
//   .catch((error) => {
//     error('error connection to MongoDB:', error.message);
//   });

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const App = () => {
  const result = useQuery(ALL_BOOKS);
  const result2 = useQuery(ALL_AUTHORS);

  const [page, setPage] = useState('authors');

  if (result.loading || result2.loading) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors authors={result2.data.allAuthors} show={page === 'authors'} />

      <Books books={result.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  );
};

export default App;
