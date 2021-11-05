import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, tap, catchError, exhaustMap } from 'rxjs/operators';
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";

import { CharacterDTO } from "../../interfaces/character.card.interface";
import * as charactersActions from "./character-card.actions";
import { CharacterCardService } from "../../services/character-card/character-card.service";

@Injectable()
export class CharactersEffects {

    loadCharacters$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadActionsType.LOAD_CHARACTERS_REQUEST),
            exhaustMap(() => this.characterCardService.getCharacters()
                .pipe(
                    map((usersSuccess: CharacterDTO[]) => (charactersActions.loadCharactersSuccess({characters: usersSuccess }))),
                    tap((action) => console.log("Users:", action.characters)),
                    catchError((error) => of(charactersActions.loadCharactersFail(error)))
                )
            )
        )
    )

    loadCharacter$: Observable<Action> = createEffect(() => this.actions$
        .pipe(
            ofType(charactersActions.loadCharacterRequest),
            // ofType(charactersActions.loadActionsType.LOAD_CHARACTER_REQUEST), 
            //Дима у меня вопрос: Я закоментировал 30 строчку, но таким способом если я делаю запрос к actions он не отрабатывает, мучался с этим долго,
            //500 ошибка и [Object, Obgect]. Почему так происходит? Это связано потому что LOAD_CHARACTER_REQUEST объявлен через enum?
            exhaustMap((action) => this.characterCardService.getCharactersId(action.characterID)
                .pipe(
                    map((userSuccess: CharacterDTO) => (charactersActions.loadCharacterSuccess({character: userSuccess}))),
                    tap((action) => console.log("User:", action.character)),
                    catchError((error) => of(charactersActions.loadCharacterFail(error)))
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private characterCardService: CharacterCardService
    ){}
}