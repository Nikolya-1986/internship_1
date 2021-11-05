import { ActionReducerMap, createFeatureSelector, createSelector, createSelectorFactory } from "@ngrx/store";
import { CharactersState, CharactersReducer } from "./character-card.reducer";
import AppCharactersState from "./character-card.state";

export const getCharactersFutureSelector = createFeatureSelector<CharactersState>("characters")

export const getCharactersLoadingSelector = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.loading
);

export const getCharactersListSelector = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.characters
);

export const getCharactersFailSelector = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.errorMessage
);

export const getCharacterCurrentSelector = createSelector (
    getCharactersFutureSelector,
    (state: CharactersState) => state.selectCharacter
);

export const reducerUsers: ActionReducerMap<AppCharactersState> = {
    characters: CharactersReducer
};