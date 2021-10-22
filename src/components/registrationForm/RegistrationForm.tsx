import React, { FC } from 'react';
import './registrationForm.css';
import axios from 'axios';
import { responseDataType } from '../../types/types';

type objectRegistrationFormDataType = {
  username: string;
  password: string;
  userStatus: string;
};

const RegistrationForm: FC = () => {
  const submitRegistrationForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userStatus, setUserStatus] = React.useState('viewer');

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
    const objectRegistrationFormData: objectRegistrationFormDataType = {
      username: name,
      password: password,
      userStatus: userStatus,
    };
    setName('');
    setPassword('');
    setUserStatus('viewer');
    console.log(objectRegistrationFormData);
    try {
      const response: responseDataType = await axios.post(
        'https://hidden-journey-30045.herokuapp.com/api/auth/register',
        objectRegistrationFormData
      );
      console.log(response.data.message);
    } catch (error: any) {
      console.log(error.response.data.message);
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
    </div>
  );
};

export default RegistrationForm;
