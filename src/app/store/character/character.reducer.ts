import { createReducer, on } from "@ngrx/store";

import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";
import *as characterActions from "./character.actions";

export interface CharactersState {
    characters: CharacterDTO<LocationDTO>[],
    loading: boolean,
    errorMessage: string | any
}; 

const initialstate: CharactersState = {
    characters: [],
    loading: false,
    errorMessage: ""
};

export const CharactersReducer = createReducer (
    initialstate,
    on(characterActions.loadCharactersRequest, state => ({
        ...state,
        loading: true
    })),
    on(characterActions.loadCharactersSuccess, (state, action) => ({            
        ...state,
        loading: false,
        characters: action.characters
    })),
    on(characterActions.loadCharactersFail, (state, action) => ({
        ...state,
        loading: false,
        errorMessage: action.error
    })),
    on(characterActions.updateCharacter, (state, action) => {
        const updateCharacters = [...state.characters.map((item) => {
            return item.id === action.character.id ? action.character : item
        })];

        console.log(action.character);
        return {
            ...state,
            loading: false,
            characters: updateCharacters
        }
    })
)