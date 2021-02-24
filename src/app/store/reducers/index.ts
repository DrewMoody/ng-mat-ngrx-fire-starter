import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { reducer as userReducer } from './user';
import { environment } from '../../../environments/environment';
import { AppState } from '../../models/state';

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
