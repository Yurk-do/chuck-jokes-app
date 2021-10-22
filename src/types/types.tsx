export interface fetchResponseDataType {
  type: string;
  value: JokesDataType[];
}

export interface JokesDataType {
  _id: string;
  status: string;
  jokes: string[];
  jokesQuantity: number;
}

export interface JokesStateType {
  fetchedJokesData: JokesDataType[];
  quantity: string;
}

export interface AppStateType {
  userName: string;
  userStatus: string | null;
  authStatus: boolean;
  loading: boolean;
  alertMessage: string | null;
}

export interface AppActionType {
  type: string;
  payload: boolean | string | LoginInPayloadType;
}

export type JokesActionType = {
  type: string;
  payload: JokesDataType[];
};

export type LoaderType = {
  type: string;
};

export type LoginInPayloadType = {
  userName: string;
  userStatus: string | null;
};

export type LoginInActionType = {
  type: string;
  payload: LoginInPayloadType;
};
export type LoginOutActionType = {
  type: string;
};

export type AlertType = {
  type: string;
  payload?: string;
};

export type ChangeQuantityType = {
  type: string;
  payload: string;
};

export type ActionType = {
  action:
    | LoaderType
    | AlertType
    | ChangeQuantityType
    | AppActionType
    | AuthFormActionType
    | LoginInActionType;
};

export type StateType = {
  jokes: JokesStateType;
  app: AppStateType;
};

export type AuthFormDataType = {
  name: string;
  password: string;
};

export type AuthFormStateType = {
  authFormData: AuthFormDataType;
};

export type AuthFormActionType = {
  type: string;
  payload: string;
};

export type responseDataType = {
  data: {
    token: string;
    message: string;
  };
};
