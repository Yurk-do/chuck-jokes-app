import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchJokes,
  changeQuantity,
  showAlert,
  hideAlert,
} from '../../redux/actionsCreater';
import { StateType } from '../../types/types';
import './jokesForm.css';
import ErrorWindow from '../windows/errorWindow/ErrorWindow';

const JokesForm: FC = () => {
  const dispatch = useDispatch();

  const userStatus = useSelector((state: StateType) => state.app.userStatus);
  const [statusErrorWindow, setStatusErrorWindow] = useState(false);

  const quantity = useSelector((state: StateType) => state.jokes.quantity);
  const alertMessage = useSelector(
    (state: StateType) => state.app.alertMessage
  );

  if (!Number(quantity) && quantity !== '') {
    dispatch(showAlert('Допустимо введение только числовых значений!'));
  } else {
    dispatch(hideAlert());
  }

  const changeJokesQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = event.target.value;
    dispatch(changeQuantity(quantity));
  };

  const getJokes = () => {
    if (userStatus === 'viewer') {
      return setStatusErrorWindow(true);
    }
    dispatch(fetchJokes(quantity));
  };

  return (
    <div className='jokes-form-container'>
      <div>
        <label className='jokes-form-label' htmlFor='quantity-input'>
          Введите желаемое количество шуток
        </label>
        <input
          className='jokes-form-input'
          name='quantity-input'
          type='text'
          id='quantity-input'
          value={quantity}
          onChange={changeJokesQuantity}
        />
      </div>
      <button className='jokes-form-button' onClick={getJokes}>
        Запросить
      </button>
      <p className='input-alert-message'>{alertMessage}</p>
      {statusErrorWindow && (
        <ErrorWindow
          mainMessage='У Вас нет прав доступа к запросу шуток'
          extraMessage='Правом запроса шуток обладают пользователи со статусом "Creater"'
          closeErrorWindow={() => {
            setStatusErrorWindow(false);
          }}
        />
      )}
    </div>
  );
};

export default JokesForm;
