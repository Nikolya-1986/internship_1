import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, catchError, exhaustMap, withLatestFrom } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";

import * as charactersActions from "./character.actions";
import { CharacterService } from "../../services/character/character.service";
import AppCharactersState from "./character.state";
import * as characterSelectors from "./character.selector";

@Injectable()
export class CharactersEffects {

    loadCharacters$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadActionsType.LOAD_CHARACTERS_REQUEST),
            exhaustMap(() => this.characterService.getAllCharacters()
                .pipe(
                    withLatestFrom(
                        this.store.select(characterSelectors.getCharactersListSelector),
                    ),
                    map(([newCharacters, currentCharacters]) => {
                        if (currentCharacters.length < 826) {
                            return (charactersActions.loadCharactersSuccess({characters: newCharacters.results}));
                        } else {
                            return { type: 'Empty Action' };
                        }
                    }),
                    tap((allCharacters) => console.log(allCharacters)),
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