import React from 'react';
import { responseDataType } from '../types/types';
import { loginIn } from '../redux/actionsCreater';
import axios from 'axios';
import jwt_decoded from 'jwt-decode';

async function auth(history: any, dispatch: any) {
  try {
    const response: responseDataType = await axios.get(
      `https://hidden-journey-30045.herokuapp.com/api/auth/auth`,
      {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      }
    );

    localStorage.removeItem('token');
    localStorage.setItem('token', response.data.token);

    const decodedToken: any = jwt_decoded(response.data.token);

    dispatch(loginIn(decodedToken.username, decodedToken.userStatus));
    

    console.log(history.location.pathname)
    history.push(`/jokesListPage/${decodedToken.username}`);
  } catch (error: any) {
    console.log(error);
  }
}

export default auth;
