import { createAction, props, union } from "@ngrx/store";
import { CharacterDTO } from "../../interfaces/character.card.interface";

export enum loadActionsType {
    LOAD_CHARACTERS_REQUEST = '[CHARACTERS] Load Characters Request',
    LOAD_CHARACTERS_SUCCESS = '[CHARACTERS] Load Characters Success',
    LOAD_CHARACTERS_FAIL = '[CHARACTERS] Load Characters Fail',
    LOAD_CHARACTER_REQUEST = '[CHARACTER] Load Character Request',
    LOAD_CHARACTER_SUCCESS = '[CHARACTER] Load Character Success',
    LOAD_CHARACTER_FAIL = '[CHARACTER] Load Character Fail'
}

export const loadCharactersRequest = createAction (
    loadActionsType.LOAD_CHARACTERS_REQUEST
);

export const loadCharactersSuccess = createAction (
    loadActionsType.LOAD_CHARACTERS_SUCCESS,
    props<{characters: CharacterDTO[]}>()
);

export const loadCharactersFail = createAction (
    loadActionsType.LOAD_CHARACTERS_FAIL,
    props<{error: string | any}>()
);

export const loadCharacterRequest = createAction (
    loadActionsType.LOAD_CHARACTER_REQUEST,
    props<{characterID: number}>()
);

export const loadCharacterSuccess = createAction (
    loadActionsType.LOAD_CHARACTER_SUCCESS,
    props<{character: CharacterDTO}>()
);

export const loadCharacterFail = createAction (
    loadActionsType.LOAD_CHARACTER_FAIL,
    props<{error: string | any}>()
);

const allCharactersActions = union({
    loadCharactersRequest,
    loadCharactersSuccess,
    loadCharactersFail,
    loadCharacterRequest,
    loadCharacterSuccess,
    loadCharacterFail,
})

export type CharactersActions = typeof allCharactersActions