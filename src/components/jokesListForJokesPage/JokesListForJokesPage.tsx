import { FC } from 'react';
import './JokesListForJokesPage.css';

interface JokesListForJokesPageProps {
  jokes: string[];
}

const JokesListForJokesPage: FC<JokesListForJokesPageProps> = ({ jokes }) => {
  return (
    <ul className='jokes-list-container'>
      {jokes.map((joke: string) => (
        <li className='joke' key={joke}>
          {joke}
        </li>
      ))}
    </ul>
  );
};

export default JokesListForJokesPage;
