import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const FIND_AUTHOR = gql`
  query findAuthorByName($nameToSearch: String!) {
    findAuthor(name: $nameToSearch) {
      name
      id
      born
      bookCount
    }
  }
`;

const Author = ({ author, onClose }) => {
  return (
    <div>
      <h2>{author.name}</h2>
      <div>
        {author.name} was born in {author.born} and has written{' '}
        {author.bookCount} book(s)
      </div>
      <div>{author.id}</div>
      <button onClick={onClose}>close</button>
    </div>
  );
};

const Books = ({ books }) => {
  const [author, setAuthor] = useState(null);
  const [name, setName] = useState('');
  const result = useQuery(FIND_AUTHOR, {
    variables: { nameToSearch: name },
    skip: !name,
  });

  if (name && result.data) {
    return (
      <Author author={result.data.findAuthor} onClose={() => setName('')} />
    );
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author {books[0].title}</th>
            <th>published</th>
          </tr>
          {books.map((a, idx) => (
            <tr key={idx}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
              <button onClick={() => setName(a.author)}>Show Author</button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
