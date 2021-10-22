import {
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  LOGIN_IN,
  LOGIN_OUT,
} from './actionTypes';

import { AppStateType, AppActionType } from '../types/types';

const initialState: AppStateType = {
  userName: '',
  userStatus: null,
  authStatus: false,
  loading: false,
  alertMessage: null,
};

export const appReducer = (state = initialState, action: AppActionType | any) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true };
    case HIDE_LOADER:
      return { ...state, loading: false };
    case SHOW_ALERT:
      return { ...state, alertMessage: action.payload };
    case HIDE_ALERT:
      return { ...state, alertMessage: null };
    case LOGIN_IN:
      return { ...state, authStatus: true, userName: action.payload.userName, userStatus: action.payload.userStatus };
    case LOGIN_OUT:
      return { ...state, authStatus: false, userName: '', userStatus: ''};
    default:
      return state;
  }
};
