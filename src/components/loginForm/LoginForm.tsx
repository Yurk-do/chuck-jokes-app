import React, { FC, useState } from 'react';
import './loginForm.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { responseDataType } from '../../types/types';
import { loginIn } from '../../redux/actionsCreater';
import { useHistory } from 'react-router';
import jwt_decoded from 'jwt-decode';
import NotificationWindow from '../windows/notificationWindow/NotificationWindow';

type objectAuthFormDataType = {
  username: string;
  password: string;
};

const LoginForm: FC = () => {
  const submitAuhtForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const history = useHistory();

  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [notificationData, setNotificationData] = useState({
    message: '',
    status: false,
    isError: false,
  });

  const setValuesFuncMap: { [key: string]: Function } = {
    name: setName,
    password: setPassword,
  };

  const changeAuthFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValuesFuncMap[event.target.name](event.target.value);
  };

  const sendData = async () => {
    const objectAuthFormData: objectAuthFormDataType = {
      username: name,
      password: password,
    };
    setName('');
    setPassword('');
    try {
      const response: responseDataType = await axios.post(
        'https://hidden-journey-30045.herokuapp.com/api/auth/login',
        objectAuthFormData
        // { headers: { Authorization: token } }
      );
      localStorage.setItem('token', response.data.token);

      const decodedToken: any = jwt_decoded(response.data.token);

      dispatch(loginIn(decodedToken.username, decodedToken.userStatus));
      history.push(`/jokesListPage/${decodedToken.username}`);
    } catch (error: any) {
      if (error.response.data.message) {
        setNotificationData({
          message: error.response.data.message,
          status: true,
          isError: true,
        });

        setTimeout(() => {
          setNotificationData({ ...notificationData, status: false });
        }, 3000);
      }
    }
  };

  return (
    <div className='form-container'>
      <h2 className='form-title'>Пожалуйста введите данные для авторизации</h2>
      <form onSubmit={submitAuhtForm}>
        <div className='input-name-section'>
          <label htmlFor='name'>Введите имя</label>
          <input
            type='text'
            id='name'
            name='name'
            onChange={changeAuthFormData}
            value={name}
          />
        </div>
        <div className='input-password-section'>
          <label htmlFor='name'>Введите пароль:</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={changeAuthFormData}
            value={password}
          />
        </div>
        <button className='button-submit' onClick={sendData}>
          Авторизироваться
        </button>
      </form>
      {notificationData.status && (
        <NotificationWindow
          isError={notificationData.isError}
          notificationMessage={notificationData.message}
        />
      )}
    </div>
  );
};

export default LoginForm;
