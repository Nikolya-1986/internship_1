import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";

import { Character } from "../../interfaces/character.card.interface";
import * as usersActions from "./character.card.actions";
import { Injectable } from "@angular/core";
import { CharacterCardService } from "../../services/character-card/character.card.service";

@Injectable()
export class UsersEffects {

    loadUsers$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(usersActions.loadActionsType.LOAD_USERS_REQUEST),
            exhaustMap(() => this.characterCardService.getCharacters()
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
        private characterCardService: CharacterCardService
    ){}
}