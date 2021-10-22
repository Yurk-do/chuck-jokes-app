import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { StateType } from '../../../types/types';
import JokesListForJokesPage from '../../jokesListForJokesPage/JokesListForJokesPage';
import './jokesPage.css';

interface JokesPageParams {
  id: string;
}

const JokesPage: FC = () => {
  const history = useHistory();
  const params = useParams<JokesPageParams>();

  const jokes = useSelector(
    (state: StateType) => state.jokes.fetchedJokesData
  ).filter((jokesObj) => jokesObj['_id'] === params.id)[0].jokes;

  return (
    <div>
      <button className='button-back' onClick={() => history.goBack()}>
        Вернуться на предыдущую страницу
      </button>
      <h1 className='home-page-title'>
        Запрошенные Вами шутки в количестве {jokes.length}:
      </h1>
      <JokesListForJokesPage jokes={jokes} />
    </div>
  );
};

export default JokesPage;
