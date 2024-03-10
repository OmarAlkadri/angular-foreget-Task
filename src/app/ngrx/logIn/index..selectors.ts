import { createSelector } from '@ngrx/store';
import { LogInState } from './index.reducer';

export const selectLogInState = (state: any) => state.logIn;

export const selectCurrentUser = createSelector(
    selectLogInState,
    (logIn: LogInState) => logIn.user
);

export const selectLogInError = createSelector(
    selectLogInState,
    (logIn: LogInState) => logIn.error
);