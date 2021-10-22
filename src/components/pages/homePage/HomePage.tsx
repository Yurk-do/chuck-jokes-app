import axios from 'axios';
import React, { FC, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginIn } from '../../../redux/actionsCreater';
import { responseDataType } from '../../../types/types';
import LoginForm from '../../loginForm/LoginForm';
import RegistrationForm from '../../registrationForm/RegistrationForm';
import './homePage.css';
import jwt_decoded from 'jwt-decode';

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

  const refreshData = () => {
    if (!localStorage.getItem('token')) {
      return;
    }
    auth();
  };

  const auth = async () => {
    try {
      const response: responseDataType = await axios.get(
        `http://127.0.0.1:5000/api/auth/auth`,
        {
          headers: { Authorization: `${localStorage.getItem('token')}` },
        }
      );

      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.token);

      const decodedToken: any = jwt_decoded(response.data.token);

      dispatch(loginIn(decodedToken.username, decodedToken.userStatus));

      history.push(`/jokesListPage/${decodedToken.username}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    refreshData();
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
        {registrationFormStatus ? <RegistrationForm /> : <LoginForm />}
      </div>
    </div>
  );
};

export default HomePage;
