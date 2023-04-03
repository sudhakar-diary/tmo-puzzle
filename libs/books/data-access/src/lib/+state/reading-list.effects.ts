import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { empty, of } from 'rxjs';
import { ReadingListItem } from '@tmo/shared/models';
import * as ReadingListActions from './reading-list.actions';
import { catchError, concatMap, exhaustMap, filter, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

@Injectable()
export class ReadingListEffects implements OnInitEffects {
  loadReadingList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.init),
      exhaustMap(() =>
        this.http.get<ReadingListItem[]>('/api/reading-list').pipe(
          map((data) =>
            ReadingListActions.loadReadingListSuccess({ list: data })
          ),
          catchError((error) =>
            of(ReadingListActions.loadReadingListError({ error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.addToReadingList),
      concatMap(({ book }) =>
        this.http.post('/api/reading-list', book).pipe(
          map(() => ReadingListActions.confirmedAddToReadingList({ book })),
          catchError(() =>
            of(ReadingListActions.failedAddToReadingList({ book }))
          )
        )
      )
    )
  );

  removeBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReadingListActions.removeFromReadingList),
      concatMap(({ item }) =>
        this.http.delete(`/api/reading-list/${item.bookId}`).pipe(
          map(() =>
            ReadingListActions.confirmedRemoveFromReadingList({ item })
          ),
          catchError(() =>
            of(ReadingListActions.failedRemoveFromReadingList({ item }))
          )
        )
      )
    )
  );

  confirmedAddToReadingList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ReadingListActions.confirmedAddToReadingList),
        withLatestFrom(this.store.select(ReadingListActions.showUndoAddReadListSnackBarAction)),
        concatMap(([{ book }, state]: any[]) => {
          const readingList = state.readingList;
          if (readingList.showUndoAddReadListSnackBar) {
            const snackBarRef = this._snackBar.open(`Added ${book.title} to Reading List`, "Undo", {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
            snackBarRef.onAction().subscribe(() => {
              this.store.dispatch(ReadingListActions.removeFromReadingList({
                item: {
                  bookId: book.id,
                  ...book
                }
              }))
            })
          }
          return empty();
        }),
      )
    },
    { dispatch: false },
  )

  confirmedRemoveFromReadingList$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ReadingListActions.confirmedRemoveFromReadingList),
        withLatestFrom(this.store.select(ReadingListActions.showUndoRemoveReadListSnackBarAAction)),
        concatMap(([{ item }, state]: any[]) => {
          const readingList = state.readingList;
          if (readingList.showUndoRemoveReadListSnackBar) {
            const snackBarRef = this._snackBar.open(`Removed ${item.title} from reading List`, "Undo", {
              horizontalPosition: 'center',
              verticalPosition: 'top',
              duration: 3000,
            });
            snackBarRef.onAction().subscribe(() => {
              this.store.dispatch(ReadingListActions.addToReadingList({
                book: {
                  id: item.bookId, ...item
                }
              }))
            })
          }
          return empty();
        }),
      )
    },
    { dispatch: false },
  )

  ngrxOnInitEffects() {
    return ReadingListActions.init();
  }

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private readonly store: Store,
    private _snackBar: MatSnackBar
  ) { }
}