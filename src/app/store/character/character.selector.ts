import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";

import { CharactersState, CharactersReducer } from "./character.reducer";
import AppCharactersState from "./character.state";

export const getCharactersFutureSelector = createFeatureSelector<CharactersState>("characters")

export const getIsLoading = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.loadCounter !== 0
);

export const getCharactersListSelector = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.characters
);

export const getCharactersFailSelector = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.errorMessage
);

export const getCharacterCurrentSelector = (id: number) => createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.characters.find(character => character.id === id)
);

export const reducerUsers: ActionReducerMap<AppCharactersState> = {
    characters: CharactersReducer
};