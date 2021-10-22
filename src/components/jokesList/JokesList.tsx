import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import JokeItem from '../jokesItem/JokeItem';
import { JokesDataType, StateType } from '../../types/types';
import './jokesList.css';
import { useDispatch } from 'react-redux';
import { fetchJokes } from '../../redux/actionsCreater';

const JokesList = () => {
  const dispatch = useDispatch();

  const jokesData = useSelector(
    (state: StateType) => state.jokes.fetchedJokesData
  );

  useEffect(() => {
    dispatch(fetchJokes());
  }, []);

  const loading = useSelector((state: StateType) => state.app.loading);

  if (loading) {
    return <Loader />;
  }

  if (!jokesData.length) {
    return (
      <p className='not-jokes-title'>В настоящее время шутки не запрошены</p>
    );
  }

  return (
    <div className='jokes-list-container'>
      {jokesData.map((jokesObject: JokesDataType) => (
        <JokeItem
          key={jokesObject['_id']}
          jokesQuantity={jokesObject.jokesQuantity}
          jokeStatus={jokesObject.status}
          jokesId={jokesObject['_id']}
        />
      ))}
    </div>
  );
};

export default JokesList;
