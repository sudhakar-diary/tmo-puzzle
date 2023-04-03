import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromLoader from './+state/loader/loader.reducer';
import * as fromBooks from './+state/books.reducer';
import { BooksEffects } from './+state/books.effects';
import * as fromReadingList from './+state/reading-list.reducer';
import { ReadingListEffects } from './+state/reading-list.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBooks.BOOKS_FEATURE_KEY, 
      fromBooks.reducer),
    StoreModule.forFeature(
      fromReadingList.READING_LIST_FEATURE_KEY,
      fromReadingList.reducer
    ),
    StoreModule.forFeature(
      fromLoader.LOADER_FEATURE_KEY, 
      fromLoader.reducer),
    EffectsModule.forFeature([BooksEffects, ReadingListEffects])
  ]
})
export class BooksDataAccessModule {}
