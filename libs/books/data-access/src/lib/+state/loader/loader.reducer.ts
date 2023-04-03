import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Loader } from '@tmo/shared/models';

import * as LoadingActions from './loader.action';
export const LOADER_FEATURE_KEY = 'loader';
export interface State extends EntityState<Loader> {
    isLoading: boolean
}
export interface LoaderPartialState {
    readonly [LOADER_FEATURE_KEY]: State;
}

export const loaderAdapter: EntityAdapter<Loader> = createEntityAdapter<Loader>();
export const initialState: State = loaderAdapter.getInitialState({
    isLoading: false
});

const loaderReducer = createReducer(
    initialState,
    on(LoadingActions.loaderAction, (state, { payload }) => ({
        ...state,
        isLoading: payload.isLoading
    })),
)

export function reducer(state: State | undefined, action: Action) {
    return loaderReducer(state, action);
}