import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import { CharacterService } from "../../services/character/character.service";
import AppCharactersState from "./character.state";
import * as characterSelectors from "./character.selector";
import * as charactersActions from "./character.actions";

@Injectable()
export class CharactersEffects {

    loadCharacters$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadActionsType.LOAD_CHARACTERS_REQUEST),
            mergeMap(() => this.characterService.getAllCharacters()
                .pipe(
                    withLatestFrom(
                        this.store.select(characterSelectors.getCharactersListSelector),
                    ),
                    map(([newCharacter, currentCharacters]) => {
                        if (currentCharacters.length < 826) {
                            return (charactersActions.loadCharactersSuccess({characters: newCharacter.results}));
                        } else {
                            return { type: 'Empty Action' };
                        }
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