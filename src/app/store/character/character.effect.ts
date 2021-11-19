import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, catchError, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";
import * as charactersActions from "./character.actions";
import { CharacterService } from "../../services/character/character.service";
import AppCharactersState from "./character.state";
import { getCharacterCurrentSelector, getCharactersListSelector } from "./character.selector";

@Injectable()
export class CharactersEffects {

    loadCharacters$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadActionsType.LOAD_CHARACTERS_REQUEST),
            exhaustMap(() => this.characterService.getCharacters()
                .pipe(
                    withLatestFrom(
                        this.store.select(getCharactersListSelector),
                    ),
                    map(([newCharacters, currentCharacters]) => {
                        if (!currentCharacters.length) {
                            return (charactersActions.loadCharactersSuccess({characters: newCharacters}));
                        }
                        return { type: 'Empty Action' };
                    }),
                    catchError((error) => of(charactersActions.loadCharactersFail(error)))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private characterService: CharacterService,
        public store: Store<AppCharactersState>
    ){ }
}