import { createReducer, on } from "@ngrx/store";

import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";
import *as characterActions from "./character.actions";

export interface CharactersState {
    characters: CharacterDTO<LocationDTO>[],
    loading: boolean,
    // counter: number,
    errorMessage: string | any
}; 

const initialstate: CharactersState = {
    characters: [],
    loading: false,
    // counter: 0,
    errorMessage: ""
};

export const CharactersReducer = createReducer (
    initialstate,
    on(characterActions.loadCharactersRequest, state => ({
        ...state,
        loading: true
        // counter: +1
    })),
    on(characterActions.loadCharactersSuccess, (state, action) => ({            
        ...state,
        loading: false,
        // counter: -1,
        characters: [...state.characters, ...action.characters]
    })),
    on(characterActions.loadCharactersFail, (state, action) => ({
        ...state,
        loading: false,
        // counter: -1,
        errorMessage: action.error
    })),
    on(characterActions.updateCharacter, (state, action) => {
        const updateCharacter = [...state.characters.map(itemUpdate => itemUpdate.id === action.character.id ? action.character : itemUpdate)];
        console.log(action.character);
        return {
            ...state,
            loading: false,
            // counter: -1,
            characters: updateCharacter
        }
    }),
    on(characterActions.deleteCharacter, (state, action) => {
        const deleteCharacter = [...state.characters.filter(itemDelete => itemDelete.id !== action.id)];
        return {
            ...state,
            loading: false,
            // counter: -1,
            characters: deleteCharacter
        }
    }),
    on(characterActions.createCharacter, (state, action) => {
        console.log("State:", action.character);
        return {
            ...state,
            loading: false,
            // counter: -1,
            characters: [action.character, ...state.characters]
        }
    })
)