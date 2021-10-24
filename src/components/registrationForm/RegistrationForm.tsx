import React, { FC, useState } from 'react';
import './registrationForm.css';
import axios from 'axios';
import { responseDataType } from '../../types/types';
import NotificationWindow from '../windows/notificationWindow/NotificationWindow';

type objectRegistrationFormDataType = {
  username: string;
  password: string;
  userStatus: string;
};

type RegistrationFormPropsType = {
  changeRegistrationFormStatus: () => void;
};

const RegistrationForm: FC<RegistrationFormPropsType> = ({
  changeRegistrationFormStatus,
}) => {
  const submitRegistrationForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [validationMessages, setValidationMessages] = useState({
    password: '',
    name: '',
  });
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userStatus, setUserStatus] = React.useState('viewer');
  const [notificationData, setNotificationData] = useState({
    message: '',
    status: false,
    isError: false,
  });

  const setValuesFuncMap: { [key: string]: Function } = {
    name: setName,
    password: setPassword,
    userStatus: setUserStatus,
  };

  const changeRegistrationFormData = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValuesFuncMap[event.target.name](event.target.value);
  };

  const sendData = async () => {
    if (name.length < 3) {
      setValidationMessages({
        ...validationMessages,
        password: '',
        name: 'Имя пользователя не может быть менее трех символов',
      });
      return setName('');
    }
    if (name.split('').some((char) => Number(char))) {
      setValidationMessages({
        ...validationMessages,
        password: '',
        name: 'Hедопустимо использование цифр в имени',
      });
      return setName('');
    }
    if (password.length < 7) {
      setValidationMessages({
        ...validationMessages,
        name: '',
        password: 'Пароль не может быть менее семи символов',
      });
      return setPassword('');
    }

    const objectRegistrationFormData: objectRegistrationFormDataType = {
      username: name,
      password: password,
      userStatus: userStatus,
    };
    setName('');
    setPassword('');
    setUserStatus('viewer');
    try {
      const response: responseDataType = await axios.post(
        'https://hidden-journey-30045.herokuapp.com/api/auth/register',
        objectRegistrationFormData
      );
      if (response.data.message) {
        setNotificationData({
          message: response.data.message,
          status: true,
          isError: false,
        });
        setTimeout(() => {
          setNotificationData({ ...notificationData, status: false });
          changeRegistrationFormStatus();
        }, 3000);
      }
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
  const changeUserStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValuesFuncMap.userStatus(event.target.value);
  };

  return (
    <div className='form-container'>
      <h2 className='form-title'>Пожалуйста введите данные для регистрации</h2>
      <form onSubmit={submitRegistrationForm}>
        <div className='input-name-section'>
          <label htmlFor='name'>Введите имя</label>
          <input
            type='text'
            id='name'
            name='name'
            onChange={changeRegistrationFormData}
            value={name}
          />
        </div>
        {validationMessages.name.length !== 0 && (
          <p className='validate-error-message'>{validationMessages.name}</p>
        )}
        <div className='input-password-section'>
          <label htmlFor='name'>Введите пароль:</label>
          <input
            type='password'
            id='password'
            name='password'
            onChange={changeRegistrationFormData}
            value={password}
          />
        </div>
        {validationMessages.password.length !== 0 && (
          <p className='validate-error-message'>
            {validationMessages.password}
          </p>
        )}
        <div className='input-user-status-section'>
          <label htmlFor='select-user-status'>Выбирете свой статус:</label>
          <select
            name='user-status'
            className='select-user-status'
            onChange={changeUserStatus}
          >
            <option value='viewer'>Viewer</option>
            <option value='creater'>Creater</option>
          </select>
        </div>
        <button className='button-submit' onClick={sendData}>
          Зарегистрироваться
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

export default RegistrationForm;
