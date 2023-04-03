#### Code review

- Whereever we are using subcription need to be unsubscribed in ngDestroy in order to prevent the memory leak issue.
- Need to maintain spinner while making the book search api call in front end inorder to have better user experience.
- Need to have error handling for book search api call.
- In /libs/api/books/src/lib/books.service.ts file, while making search call in the response handling need to maintain null/undefined/empty check before mapping the response object.
- Looks like some test cases are failingm need to fix those.
- reducer were not available for failedAddToReadingList and failedRemoveFromReadingList actions, Need to be added.
- Better to use async pipe to display the data from store selectors instead to use subcribe for every selectors.

#### Accessibility issues

## Issues from automated scan
- Background and foreground colours do not have a sufficient contrast ratio.

## Manually found issue
- Images need to have 'alt' attribute.
- Buttons and html elements should have aria-label where ever required.
- tabs navigation is not happening on "Javascript" searchterm in the book search component.
