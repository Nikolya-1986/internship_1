import { createReducer, on } from "@ngrx/store";

import { CharacterDTO } from "../../interfaces/character.card.interface";
import *as characterActions from "./character-card.actions";

export interface CharactersState {
    characters: CharacterDTO[],
    loading: boolean,
    selectUserId: number | null, 
    selectCharacter: CharacterDTO | null,
    errorMessage: string | any
} 

const initialstate: CharactersState = {
    characters: [],
    loading: false,
    selectCharacter: null,
    selectUserId: null,
    errorMessage: ""
}

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

    on(characterActions.loadCharacterRequest, (state, action) => {
        console.log("User id:", action.characterID);
        return {
            ...state,
            loading: true,
            selectUserId: action.characterID
        }
    }),
    on(characterActions.loadCharacterSuccess, (state, action) => ({
        ...state,
        selectCharacter: action.character
    })),
    on(characterActions.loadCharacterFail, (state, action) => ({
        ...state,
        errorMessage: action.error
    }))
)