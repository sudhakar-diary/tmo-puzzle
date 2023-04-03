import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createBook, SharedTestingModule } from '@tmo/shared/testing';

import { BooksFeatureModule } from '../books-feature.module';
import { BookSearchComponent } from './book-search.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { addToReadingList, clearSearch, getAllBooks, getBooksError, getBooksLoaded, searchBooks } from '@tmo/books/data-access';
import { Book } from '@tmo/shared/models';
import { isLoaderLoading } from 'libs/books/data-access/src/lib/+state/loader/loader.selector';
import { loaderAction } from 'libs/books/data-access/src/lib/+state/loader/loader.action';

describe('ProductsListComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BooksFeatureModule, NoopAnimationsModule, SharedTestingModule],
      providers: [provideMockStore({ initialState: { books: { entities: [] } } }),]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  afterEach(() => {
    fixture.destroy();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    store.overrideSelector(isLoaderLoading, false);
    store.overrideSelector(getAllBooks, []);
    store.overrideSelector(getBooksError, {
      error: {}
    });
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('formatDate() : should return formatted data', () => {
    let result = component.formatDate('08/22/2020');
    expect(result).toBe('8/22/2020');
    result = component.formatDate('');
    expect(result).toBeUndefined();
  })

  it('should add book to reading list', () => {
    fixture.detectChanges();
    const book: Book = createBook('B');
    component.addBookToReadingList(book);
    expect(store.dispatch).toHaveBeenCalledWith(addToReadingList({ book }));
  });

  it('should  search books with the search term', () => {
    fixture.detectChanges();
    component.searchForm.controls.term.setValue('testing');
    const payload = {
      isLoading: true
    }
    store.overrideSelector(getBooksLoaded, true);
    store.overrideSelector(getAllBooks, [{ ...createBook('A'), isAdded: false }]);
    store.refreshState();
    component.searchBooks();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      loaderAction({ payload })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      searchBooks({ term: 'testing' })
    );
  });

  it('should  search books with the search term', () => {
    fixture.detectChanges();
    component.searchForm.controls.term.setValue('testing');
    const payload = {
      isLoading: true
    }
    store.overrideSelector(getBooksLoaded, true);
    store.overrideSelector(getAllBooks, [{ ...createBook('A'), isAdded: false }]);
    store.refreshState();
    component.searchBooks();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      loaderAction({ payload })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      searchBooks({ term: 'testing' })
    );
  });

  it('should dispatch clear search if no search term is exists', () => {
    fixture.detectChanges();
    component.searchForm.controls.term.setValue('');
    store.refreshState();
    component.searchBooks();
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      clearSearch()
    );
  });

});
