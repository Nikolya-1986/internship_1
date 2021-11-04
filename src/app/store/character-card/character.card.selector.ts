import { ActionReducerMap, createFeatureSelector, createSelector, createSelectorFactory } from "@ngrx/store";
import { UsersReducer, UsersState } from "./character.card.reducer";
import AppUsersState from "./character.card.state";

export const getUsersFutureSelector = createFeatureSelector<UsersState>("users")

export const getUsersLoadingSelector = createSelector (
    getUsersFutureSelector,
    (state: UsersState) => state?.loading
)

export const getUsersListSelector = createSelector (
    getUsersFutureSelector,
    (state: UsersState) => state?.users
)

export const getUsersFailSelector = createSelector (
    getUsersFutureSelector,
    (state:UsersState) => state?.errorMessage
)

export const reducerUsers: ActionReducerMap<AppUsersState> = {
    users: UsersReducer
};