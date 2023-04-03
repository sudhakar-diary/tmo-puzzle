import { initialState, reducer, State } from './loader.reducer';
import * as LoaderAction from './loader.action';
import { createBook } from '@tmo/shared/testing';
import { Loader } from '@tmo/shared/models';

describe('Loader Reducer', () => {
    describe('Get Loader Details', () => {
        it('should set the loaderAction: isLoading flag to true', () => {
            const payload: Loader = {
                isLoading: true
            }
            const loaderAction = LoaderAction.loaderAction({ payload });
            const result: State = reducer(initialState, loaderAction);
            expect(result.isLoading).toBe(true);
        });

        it('should set the loaderAction: isLoading flag to true', () => {
            const payload: Loader = {
                isLoading: false
            }
            const loaderAction = LoaderAction.loaderAction({ payload });
            const result: State = reducer(initialState, loaderAction);
            expect(result.isLoading).toBe(false);
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;
            const result = reducer(initialState, action);
            expect(result).toBe(initialState);
        });
    });
});
