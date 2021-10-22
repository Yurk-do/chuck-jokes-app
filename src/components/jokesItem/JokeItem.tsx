import { FC } from 'react';
import './jokeItem.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchJokes } from '../../redux/actionsCreater';

interface JokeItemProps {
  jokesQuantity: number;
  jokeStatus: string;
  jokesId: string;
}

enum jokeStatusMap {
  pending = 'pending',
  ready = 'ready',
}

const JokeItem: FC<JokeItemProps> = ({
  jokesQuantity,
  jokeStatus,
  jokesId,
}) => {
  const dispatch = useDispatch();

  const buttonDisabled: { [key: string]: boolean } = {
    [jokeStatusMap.pending]: true,
    [jokeStatusMap.ready]: false,
  };

  const history = useHistory();
  const match = useRouteMatch();

  const linkToJokesPage = () => {
    history.push(`${match.url}/${jokesId}`);
  };

  const deleteJokes = () => {
    dispatch(fetchJokes(null, jokesId));
  };

  return (
    <div className='joke-item-container'>
      <button
        onClick={linkToJokesPage}
        disabled={buttonDisabled[jokeStatus]}
        className={`joke-item-button-view ${jokeStatus}`}
      >
        view
      </button>
      <div className='joke-item-status-container'>
        <div className={`joke-item-status ${jokeStatus}`} />
      </div>
      <h2 className='joke-item-description'>
        Здесь Вы сможете увидеть следующее количество шуток: {jokesQuantity}
      </h2>
      <button
        onClick={deleteJokes}
        disabled={buttonDisabled[jokeStatus]}
        className={`joke-item-button-delete ${jokeStatus}`}
      >
        delete
      </button>
    </div>
  );
};

export default JokeItem;
