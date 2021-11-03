import { createReducer, on } from "@ngrx/store";

import { Character } from "../model/app.model";
import *as appActions from "./app.actions";

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

// export const UsersReduser = (state: UsersState = initialstate, action: UsersActions) => {
//     switch(action.type) {
        
//         case UsersActionTypes.LOAD_USERS_REQUEST: {
//             const usersRequest = {
//                 ...state,
//                 loading: true
//             }
//             console.log("Load Users", usersRequest.loading)
//             return usersRequest.loading
//         }

//         case UsersActionTypes.LOAD_USERS_SUCCESS: {
//             const usersSuccess = {
//                 ...state,
//                 users: {
                    // name: data.name,
                    // status: data.status,
                    // species: data.species,
                    // gender: data.gender,
                    // image: data.image
//                 }
//             }
//             console.log("Success users", usersSuccess.users)
//             return usersSuccess.users
//         }

//         case UsersActionTypes.LOAD_USERS_FAIL: {
//             const usersFail = {
//                 ...state,
//                 errorMessage: action.payload
//             }
//             console.log("Fail users", usersFail.errorMessage)
//             return usersFail.errorMessage
//         }

//         default: {
//             return state
//         }
//     }
// }