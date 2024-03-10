import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import * as LoginActions from './index.actions';
import { ApiService } from '../../api.service';

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private apiService: ApiService
    ) { }

    logIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LoginActions.logIn),
            exhaustMap((action) => {
                const a = this.apiService.logIn(action.UserName, action.Password).pipe(
                    map(user => {
                        console.log(user)
                        return LoginActions.logInSuccess({ user })
                    }),
                    catchError(error => of(LoginActions.logInFailure({ error })))
                )
                console.log(a)
                return a
            }
            )
        )
    );

    /* loginSuccess$ = createEffect(() => this.actions$.pipe(
       ofType(LoginActions.loginSuccess),
       tap(({ user }) => {
           console.log(user)
       })
   ), { dispatch: false }); */

}