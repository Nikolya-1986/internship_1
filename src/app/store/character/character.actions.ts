import { createAction, props, union } from "@ngrx/store";
import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";

export enum loadActionsType {
    LOAD_CHARACTERS_REQUEST = '[CHARACTERS] Load Characters Request',
    LOAD_CHARACTERS_SUCCESS = '[CHARACTERS] Load Characters Success',
    LOAD_CHARACTERS_FAIL = '[CHARACTERS] Load Characters Fail',
    UPDATE_CHARACTER = '[CHARACTER] Update Character',
    DELETE_CHARACTER = '[CHARACTER] Delete Character',
};

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

export const updateCharacter = createAction (
    loadActionsType.UPDATE_CHARACTER,
    props<{character: CharacterDTO<LocationDTO>}>()
);

export const deleteCharacter = createAction (
    loadActionsType.DELETE_CHARACTER,
    props<{id: number}>()
);

const allCharactersActions = union({
    loadCharactersRequest,
    loadCharactersSuccess,
    loadCharactersFail,
    updateCharacter,
    deleteCharacter
});

export type CharactersActions = typeof allCharactersActions