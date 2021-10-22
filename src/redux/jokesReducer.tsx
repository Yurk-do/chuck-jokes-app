import { FETCH_JOKES, CHANGE_QUANTITY } from './actionTypes';
import { JokesStateType, JokesActionType } from '../types/types';

const initialState: JokesStateType = {
  fetchedJokesData: [],
  quantity: '',
};

export const jokesReducer = (
  state = initialState,
  { type, payload }: JokesActionType
) => {
  switch (type) {
    case FETCH_JOKES:
      return { ...state, fetchedJokesData: payload };
    case CHANGE_QUANTITY:
      return { ...state, quantity: payload };
    default:
      return state;
  }
};
