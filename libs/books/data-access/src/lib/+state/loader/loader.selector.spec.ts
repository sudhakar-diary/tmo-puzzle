import { initialState, loaderAdapter } from './loader.reducer';
import * as loaderelectors from './loader.selector';
import { createLoader } from '@tmo/shared/testing';

describe('Loader Selectors', () => {
    let state;

    beforeEach(() => {
        state = {
            loader: loaderAdapter.addOne(
                createLoader(true),
                {
                    ...initialState,
                    isLoading : true
                }
            )
        };
    });

    describe('Loader Selectors', () => {
        it('isLoaderLoading should return the true', () => {
            const results: any = loaderelectors.isLoaderLoading(state);
            expect(results).toBe(true);
        });
    });
});
