import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';

export const init = createAction('[User] Init', props<{ user: User | null }>());
export const signIn = createAction('[User] Sign In', props<{ user: User }>());
export const signOut = createAction('[User] Sign Out');
