import { FC, useState } from 'react';
import './jokesListPage.css';
import JokesList from '../../jokesList/JokesList';
import JokesForm from '../../jokesForm/JokesForm';
import { useDispatch, useSelector } from 'react-redux';
import { StateType } from '../../../types/types';
import { loginOut } from '../../../redux/actionsCreater';
import { useHistory } from 'react-router';

const JokesListPage: FC = () => {
  const [confirmWindowStatus, setConfirmWindowStatus] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const userName = useSelector((state: StateType) => state.app.userName);
  const userStatus = useSelector((state: StateType) => state.app.userStatus);

  const changeLoginStatus = () => {
    localStorage.removeItem('token');
    dispatch(loginOut());
    setConfirmWindowStatus('');
    history.push('/');
  };

  const canselExit = () => {
    setConfirmWindowStatus('');
  };
  const openConfirmWindow = () => {
    setConfirmWindowStatus('visible');
  };

  return (
    <div>
      <div className='container-logo-link'>
        <div className='login-link-container'>
          Пользователь авторизован (статус "{userStatus}"):
          <div className='login-link-user-name' onClick={openConfirmWindow}>
            {userName}
          </div>
        </div>
        <div className={`container-confirm-window ${confirmWindowStatus}`}>
          <p className='confirm-window-title'>
            Вы уверены, что хотите выйти из профиля?
          </p>
          <div className='confirm-window-button-container'>
            <button className='button-yes' onClick={changeLoginStatus}>
              Да
            </button>
            <button className='button-no' onClick={canselExit}>
              Нет
            </button>
          </div>
        </div>
      </div>
      <JokesForm />
      <JokesList />
    </div>
  );
};

export default JokesListPage;
