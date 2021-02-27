import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user';
import { User } from '../../models/user';

/** Will start as undefined. Once Google Auth comes in, will either be active user or null */
export type State = User | null | undefined;

export const initialState: State = undefined;

const userReducer = createReducer(
  initialState,
  on(UserActions.init, (_, { user }) => user),
  on(UserActions.signIn, (_, { user }) => user),
  on(UserActions.signOut, (_) => null)
);

export function reducer(state: State, action: Action) {
  return userReducer(state, action);
}
