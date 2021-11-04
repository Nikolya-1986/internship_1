import { createAction, props, union } from "@ngrx/store";
import { Character } from "../../interfaces/character.card.interface";

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