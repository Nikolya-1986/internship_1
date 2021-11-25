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
        characters: [...state.characters, ...action.characters]
    })),
    on(characterActions.loadCharactersFail, (state, action) => ({
        ...state,
        loading: false,
        errorMessage: action.error
    })),
    on(characterActions.updateCharacter, (state, action) => {
        const updateCharacter = [...state.characters.map((itemUpdate) => {
            return itemUpdate.id === action.character.id ? action.character : itemUpdate
        })];

        console.log(action.character);
        return {
            ...state,
            loading: false,
            characters: updateCharacter
        }
    }),
    on(characterActions.deleteCharacter, (state, action) => {
        const deleteCharacter = [...state.characters.filter((itemDelete) => {
            return itemDelete.id !== action.id;
        })];
        return {
            ...state,
            loading: false,
            characters: deleteCharacter
        }
    })
)