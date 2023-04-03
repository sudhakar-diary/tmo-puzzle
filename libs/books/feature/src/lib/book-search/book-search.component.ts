import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getBooksError,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { loaderAction } from 'libs/books/data-access/src/lib/+state/loader/loader.action';
import { isLoaderLoading } from 'libs/books/data-access/src/lib/+state/loader/loader.selector';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit, OnDestroy {
  searchForm = this.fb.group({
    term: ''
  });
  subscriptionList: Subscription[] = [];
  getAllBooks$: Observable<ReadingListBook[]>;
  bookSearchErr$: any;
  isloading$: any;
  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) { }

  get searchTerm(): string {
    return this.searchForm.value.term;
  }

  ngOnInit(): void {
    this.getAllBooks$ = this.store.select(getAllBooks);
    this.isloading$ = this.store.select(isLoaderLoading);
    this.bookSearchErr$ = this.store.select(getBooksError);
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    const payload = {
      isLoading: true
    }
    if (this.searchForm.value.term) {
      this.store.dispatch(loaderAction({ payload }))
      this.store.dispatch(searchBooks({ term: this.searchTerm }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }

  ngOnDestroy(): void {
  }
}
