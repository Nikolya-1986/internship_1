import { createReducer, on } from "@ngrx/store";

import { Character } from "../../interfaces/character.card.interface";
import *as appActions from "./character.card.actions";

export interface UsersState {
    users: Character[],
    loading: boolean,
    selectUserId: number | null, 
    errorMessage: string | any
} 

const initialstate: UsersState = {
    users: [],
    loading: false,
    selectUserId: null,
    errorMessage: ""
}

export const UsersReducer = createReducer (
    initialstate,
    on(appActions.loadUsersRequest, state => ({
        ...state,
        loading: true
    })),
    on(appActions.loadUsersSuccess, (state, action) => ({            
        ...state,
        users: action.caracters
    })),

    on(appActions.loadUsersFail, (state, action) => ({
        ...state,
        errorMessage: action.error
    }))
)