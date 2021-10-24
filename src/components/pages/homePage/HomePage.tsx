import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../../loginForm/LoginForm';
import RegistrationForm from '../../registrationForm/RegistrationForm';
import './homePage.css';
import auth from '../../../assets/auth';

const HomePage: FC = () => {
  const [registrationFormStatus, setRegistrationFormStatus] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  let buttonName = registrationFormStatus
    ? 'Перейти к авторизации'
    : 'Перейти к регистрации';

  const changeRegistrationFormStatus = () => {
    setRegistrationFormStatus(!registrationFormStatus);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return;
    }
    auth(history, dispatch);
  }, []);

  return (
    <div className='main-container'>
      <button
        className='button-registration'
        onClick={changeRegistrationFormStatus}
      >
        {buttonName}
      </button>
      <div className='title-container'>
        <h1 className='title'>This is Jokes App</h1>
        <h2 className='subtitle'>Лучшие шутки про Чака Нориса</h2>
      </div>
      <div className='auth-form-container'>
        {registrationFormStatus ? (
          <RegistrationForm
            changeRegistrationFormStatus={() => {
              setRegistrationFormStatus(false);
            }}
          />
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default HomePage;
