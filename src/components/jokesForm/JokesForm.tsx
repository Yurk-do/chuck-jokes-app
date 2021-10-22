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

const JokesForm: FC = () => {
  const dispatch = useDispatch();

  const userStatus = useSelector((state: StateType) => state.app.userStatus);
  const [statusErrorWindow, setStatusErrorWindow] = useState('');

  const quantity = useSelector((state: StateType) => state.jokes.quantity);
  const alertMessage = useSelector(
    (state: StateType) => state.app.alertMessage
  );

  if (!Number(quantity) && quantity !== '') {
    dispatch(showAlert('Допустимо введение только числовых значений!'));
    console.log(alertMessage);
  } else {
    dispatch(hideAlert());
  }

  const changeJokesQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = event.target.value;
    dispatch(changeQuantity(quantity));
  };

  const getJokes = () => {
    console.log(userStatus);
    if (userStatus === 'viewer') {
      return setStatusErrorWindow('active');
    }
    dispatch(fetchJokes(quantity));
  };

  const closeErrorWindow = () => {
    setStatusErrorWindow('');
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
      <div className={`error-window ${statusErrorWindow}`}>
        <div className='content-container'>
          <p>У Вас нет прав доступа к запросу шуток</p>
          <p>Данным правом обладают пользователи со статусом "Creater"</p>
        </div>
        <button
          className='button-close-error-window'
          onClick={closeErrorWindow}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default JokesForm;
