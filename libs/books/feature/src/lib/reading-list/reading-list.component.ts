import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList, showUndoAddReadListSnackBarAction, showUndoRemoveReadListSnackBarAAction } from '@tmo/books/data-access';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);

  constructor(
    private readonly store: Store,
    private _snackBar: MatSnackBar
  ) { }

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const showUndoAddReadListSnackBar = false;
    const showUndoRemoveReadListSnackBar = true;
    this.store.dispatch(showUndoAddReadListSnackBarAction({ showUndoAddReadListSnackBar }));
    this.store.dispatch(showUndoRemoveReadListSnackBarAAction({ showUndoRemoveReadListSnackBar }));
  }

  ngOnDestroy() {
  }
}