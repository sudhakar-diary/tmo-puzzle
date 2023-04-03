import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BOOKS_FEATURE_KEY,
  booksAdapter,
  BooksPartialState,
  State
} from './books.reducer';

export const getBooksState = createFeatureSelector<BooksPartialState, State>(
  BOOKS_FEATURE_KEY
);

const { selectAll } = booksAdapter.getSelectors();

export const getBooksLoaded = createSelector(
  getBooksState,
  (state: State) => state.loaded
);

export const getBooksError = createSelector(
  getBooksState,
  (state: State) => {
    if (state && state.error) {
      const errorResponse = state.error;
      if (errorResponse) {
        if (errorResponse['error'] && (errorResponse['error']['statusCode'] === 404
          || errorResponse['error']['statusCode'] === 422)) {
          return errorResponse['error']['message'];
        } else {
          return "Something went wrong! Couldn't fetch Book details for the given search term!";
        }
      }
    }
  });

export const getBooks = createSelector(getBooksState, selectAll);
