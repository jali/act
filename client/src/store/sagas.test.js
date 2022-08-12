import { all } from 'redux-saga/effects';
import rootSaga from './sagas';
import authSaga from 'features/auth/saga';

describe('The rootSaga', () => {
    test('should run combined sagas', () => {
        const gen = rootSaga();
        expect(gen.next().value).toEqual(all([
            authSaga()
        ]));
    });
});
