import rootReducer from './reducers';
import { legacy_createStore as createStore } from 'redux';
import auth from 'features/auth/slice';

describe('The rootReducer', () => {
    it('should have combined the reducers', () => {
        const store = createStore(rootReducer);
        expect(store.getState().auth).toEqual(auth(undefined, {}));
    });
});
