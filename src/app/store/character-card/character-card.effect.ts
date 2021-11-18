import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";

import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";
import * as charactersActions from "./character-card.actions";
import { CharacterService } from "../../services/character/character.service";

@Injectable()
export class CharactersEffects {

    loadCharacters$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadActionsType.LOAD_CHARACTERS_REQUEST),
            exhaustMap(() => this.characterService.getCharacters()
                .pipe(
                    map((usersSuccess: CharacterDTO<LocationDTO>[]) => (charactersActions.loadCharactersSuccess({characters: usersSuccess }))),
                    tap((action) => console.log("Characters:", action.characters)),
                    catchError((error) => of(charactersActions.loadCharactersFail(error)))
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private characterService: CharacterService
    ){}
}