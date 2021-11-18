import { createAction, props, union } from "@ngrx/store";
import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";

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
    props<{characters: CharacterDTO<LocationDTO>[]}>()
);

export const loadCharactersFail = createAction (
    loadActionsType.LOAD_CHARACTERS_FAIL,
    props<{error: string | any}>()
);


const allCharactersActions = union({
    loadCharactersRequest,
    loadCharactersSuccess,
    loadCharactersFail,
})

export type CharactersActions = typeof allCharactersActions