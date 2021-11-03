import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';

import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AppService } from "../services/app.service";
// import * as usersActions from "./app.actions";
import { Character } from "../model/app.model";
import * as usersActions from "./app.actions";
import { Injectable } from "@angular/core";

@Injectable()
export class UsersEffects {

    loadUsers$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(usersActions.loadActionsType.LOAD_USERS_REQUEST),
            exhaustMap(() => this.usersService.getCharacters()
                .pipe(
                    map((usersSuccess: Character[]) => ({ 
                        type: '[USERS] Load Users Success', caracters: usersSuccess }
                    )),
                    catchError((error) => of(usersActions.loadUsersFail(error)))
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private usersService: AppService
    ){}
}