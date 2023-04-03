import { createAction, props } from '@ngrx/store';

import { Loader } from '@tmo/shared/models';


export const loaderAction = createAction(
    '[Loader] Value',
    props<{ payload: Loader }>()
);
