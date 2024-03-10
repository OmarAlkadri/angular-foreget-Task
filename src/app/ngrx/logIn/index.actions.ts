
import { createAction, props } from '@ngrx/store';

export const logIn = createAction('[Auth] Log In', props<{ UserName: string; Password: string }>());
export const logInSuccess = createAction('[Auth] Log In Success', props<{ user: any }>());
export const logInFailure = createAction('[Auth] Log In Failure', props<{ error: any }>());