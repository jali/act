import { all, call, put, takeLatest } from 'redux-saga/effects';
import authSaga, { loginSaga, logoutSaga, postLogin } from './saga';
import * as actionSelectors from './slice';

describe('Auth Saga', () => {
    it('should setup the watchers', () => {
        const gen = authSaga();
        expect(gen.next().value).toEqual(all([
            takeLatest(actionSelectors.login.type, loginSaga),
            takeLatest(actionSelectors.logout.type, logoutSaga)
        ]));
    });

    beforeEach(() => {
    });

    it('should trigger relevant actions when LOGIN request fails', () => {
        const payload = {email:'asdf', pass:'asdf'};
        const config = {headers: {'Content-type': 'application/json; charset=UTF-8'}};
        const gen = loginSaga({payload});
        const error = {status: 400, message: 'test'};
        expect(gen.next().value).toEqual(call(postLogin, payload, config));
        expect(gen.throw(error).value).toEqual(put(actionSelectors.error(error)));
    });

    it('should trigger relevant actions when LOGOUT method is requested', () => {    
        const gen = logoutSaga();
        expect(gen.next().value).toEqual(put(actionSelectors.init()));
    });
});
