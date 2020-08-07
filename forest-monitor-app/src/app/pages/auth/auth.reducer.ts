import { createReducer, on, Action } from '@ngrx/store';
import {
  Login, Logout
} from './auth.action';
import { AuthState } from './auth.state';
import { getLocalStorageAuthKey } from '../../shared/helpers/CONSTS';

/** initial values to Auth State */
const initialState: AuthState = {
  userId: localStorage.getItem(getLocalStorageAuthKey()) ? JSON.parse(localStorage.getItem(getLocalStorageAuthKey()))['userId'] : '',
  token: localStorage.getItem(getLocalStorageAuthKey()) ? JSON.parse(localStorage.getItem(getLocalStorageAuthKey()))['token'] : ''
};

/**
 * reducer to manage Auth state
 * set new values in AuthState
 */
const reducerAuth = createReducer(initialState,
  on(Login, (state, payload) => {
    localStorage.setItem(getLocalStorageAuthKey(), JSON.stringify(payload));
    return { ...state, userId: payload['userId'].toString(), token: payload['token'].toString() };
  }),
  on(Logout, (state) => {
    localStorage.removeItem(getLocalStorageAuthKey());
    return { ...state, userId: '', token: '' };
  })
);

export function reducer(state: AuthState | undefined, action: Action) {
  return reducerAuth(state, action);
}

