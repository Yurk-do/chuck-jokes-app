import { io } from 'socket.io-client';

import {
  LoaderType,
  AlertType,
  ChangeQuantityType,
  LoginInActionType,
  LoginOutActionType,
  StateType,
} from '../types/types';
import {
  FETCH_JOKES,
  SHOW_ALERT,
  HIDE_ALERT,
  HIDE_LOADER,
  SHOW_LOADER,
  CHANGE_QUANTITY,
  LOGIN_IN,
  LOGIN_OUT,
} from './actionTypes';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';

export function showLoader(): LoaderType {
  return {
    type: SHOW_LOADER,
  };
}

export function hideLoader(): LoaderType {
  return {
    type: HIDE_LOADER,
  };
}
export function showAlert(text: string): AlertType {
  return {
    type: SHOW_ALERT,
    payload: text,
  };
}
export function hideAlert(): AlertType {
  return {
    type: HIDE_ALERT,
  };
}

export const fetchJokes = (
  quantity?: string | null,
  idFromDelete?: string
): ThunkAction<void, StateType, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const socket = io('https://hidden-journey-30045.herokuapp.com/api/jokes/chuck', {
        transports: ['websocket'],
      });
      socket.on('message', (message) => {
        console.log(message);
      });

      if (!idFromDelete && !quantity) {
        socket.emit('getAllJokes', 'giveMeJokes');
      }

      if (idFromDelete) {
        socket.emit('delete', idFromDelete);
      }

      if (quantity) {
        socket.emit('quantity', quantity);
      }

      socket.on('extractJokes', (jokesData) => {
        dispatch({ type: FETCH_JOKES, payload: jokesData });
        dispatch(hideLoader());
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export function changeQuantity(quantity: string): ChangeQuantityType {
  return {
    type: CHANGE_QUANTITY,
    payload: quantity,
  };
}

export function loginIn(
  userName: string,
  userStatus: string | null
): LoginInActionType {
  return {
    type: LOGIN_IN,
    payload: {
      userName: userName,
      userStatus: userStatus,
    },
  };
}
export function loginOut(): LoginOutActionType {
  return {
    type: LOGIN_OUT,
  };
}
