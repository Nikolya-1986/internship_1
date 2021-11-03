import { createAction, props, union } from "@ngrx/store";
import { Character } from "../model/app.model";

export enum loadActionsType {
    LOAD_USERS_REQUEST = '[USERS] Load Users Request',
    LOAD_USERS_SUCCESS = '[USERS] Load Users Success',
    LOAD_USERS_FAIL = '[USERS] Load Users Fail'
}

export const loadUsersRequest = createAction (
    loadActionsType.LOAD_USERS_REQUEST
)

export const loadUsersSuccess = createAction (
    loadActionsType.LOAD_USERS_SUCCESS,
    props<{caracters: Character[]}>()
)

export const loadUsersFail = createAction (
    loadActionsType.LOAD_USERS_FAIL,
    props<{error: any}>()
)

const allUsersActions = union({
    loadUsersRequest,
    loadUsersSuccess,
    loadUsersFail
})

export type UsersActions = typeof allUsersActions
// export const loadUsersRequest = createAction(
//     '[USERS] Load Users Request'
// )

// export const loadUsersSuccess = createAction (
//     '[USERS] Load Users Success',
//     props<{caracters: Character[]}>()
// )

// export const loadUsersFail = createAction (
//     '[USERS] Load Users Fail',
//     props<{error: any}>()

// )
// export enum UsersActionTypes {
//     LOAD_USERS_REQUEST = '[USERS] Load Users Request',
//     LOAD_USERS_SUCCESS = '[USERS] Load Users Success',
//     LOAD_USERS_FAIL = '[USERS] Load Users Fail'
// }

// export class LoadUsersRequestActions implements Action {
//     readonly type = UsersActionTypes.LOAD_USERS_REQUEST
    
// }

// export class LoadUsersSuccesActions implements Action {
//     readonly type =  UsersActionTypes.LOAD_USERS_SUCCESS

//     constructor(public payload: Character[]){}
// }

// export class LoadUsersFailActions implements Action {
//     readonly type = UsersActionTypes.LOAD_USERS_FAIL

//     constructor(public payload: any){}
// }

// export type UsersActions =  LoadUsersRequestActions |
//                             LoadUsersSuccesActions |
//                             LoadUsersFailActions