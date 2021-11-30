import { createReducer, on } from "@ngrx/store";

import { CharacterDTO, LocationDTO } from "../../interfaces/character-interface";
import *as characterActions from "./character.actions";

export interface CharactersState {
    characters: CharacterDTO<LocationDTO>[],
    loadCounter: number,
    errorMessage: string | any
}; 

const initialstate: CharactersState = {
    characters: [],
    loadCounter: 0,
    errorMessage: ""
};

export const CharactersReducer = createReducer (
    initialstate,
    on(characterActions.loadStart, state => ({
        ...state,
        loadCounter: state.loadCounter + 1
    })),
    on(characterActions.loadEnd, state => ({
        ...state,
        loadCounter: state.loadCounter - 1
    })),
    on(characterActions.loadCharactersRequest, state => ({
        ...state,
    })),
    on(characterActions.loadCharactersSuccess, (state, action) => ({            
        ...state,
        characters: [...state.characters, ...action.characters]
    })),
    on(characterActions.loadCharactersFail, (state, action) => ({
        ...state,
        errorMessage: action.error
    })),
    on(characterActions.updateCharacter, (state, action) => {
        const updateCharacter = [...state.characters.map(itemUpdate => itemUpdate.id === action.character.id ? action.character : itemUpdate)];
        console.log(action.character);
        return {
            ...state,
            characters: updateCharacter
        }
    }),
    on(characterActions.deleteCharacter, (state, action) => {
        const deleteCharacter = [...state.characters.filter(itemDelete => itemDelete.id !== action.id)];
        return {
            ...state,
            characters: deleteCharacter
        }
    }),
    on(characterActions.createCharacter, (state, action) => {
        console.log("State:", action.character);
        return {
            ...state,
            characters: [action.character, ...state.characters]
        }
    })
)