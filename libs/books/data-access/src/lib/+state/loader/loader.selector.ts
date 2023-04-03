import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  LOADER_FEATURE_KEY,
  loaderAdapter,
  LoaderPartialState,
  State
} from './loader.reducer';

export const getLoaderState = createFeatureSelector<LoaderPartialState, State>(
    LOADER_FEATURE_KEY
);

const { selectAll } = loaderAdapter.getSelectors();

export const isLoaderLoading = createSelector(
getLoaderState,
  (state: State) => state.isLoading
);
