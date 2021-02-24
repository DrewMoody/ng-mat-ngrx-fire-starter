import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user';
import { User } from '../../models/user';

export type State = User | null;

export const initialState: State = null;

const userReducer = createReducer(
  initialState,
  on(UserActions.signIn, (_, { user }) => user),
  on(UserActions.signOut, (_) => null)
);

export function reducer(state: State, action: Action) {
  return userReducer(state, action);
}
