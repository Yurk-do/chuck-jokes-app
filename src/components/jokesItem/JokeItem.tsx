import { FC, useState } from 'react';
import './jokeItem.css';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJokes } from '../../redux/actionsCreater';
import ErrorWindow from '../windows/errorWindow/ErrorWindow';
import { StateType } from '../../types/types';

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

  const userStatus = useSelector((state: StateType) => state.app.userStatus);
  const [statusErrorWindow, setStatusErrorWindow] = useState(false);

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
    if (userStatus === 'viewer') {
      return setStatusErrorWindow(true);
    }
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
      {statusErrorWindow && (
        <ErrorWindow
          mainMessage='У Вас нет прав доступа к удалению шуток'
          extraMessage='Правом удаления шуток обладают пользователи со статусом "Creater"'
          closeErrorWindow={() => {
            setStatusErrorWindow(false);
          }}
        />
      )}
    </div>
  );
};

export default JokeItem;
