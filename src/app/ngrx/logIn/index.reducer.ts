
import { createReducer, on } from '@ngrx/store';
import * as LoginActions from './index.actions';

export interface LogInState {
  user: any; // Again, use a more specific type
  error: string | null;
}

export const initialState: LogInState = {
  user: null,
  error: null,
};

export const loginReducer = createReducer(
    initialState,
    on(LoginActions.logInSuccess, (state, { user }) => ({ ...state, user, error: null })),
    on(LoginActions.logInFailure, (state, { error }) => ({ ...state, error, user: null })),
  );