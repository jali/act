import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import authSaga, { loadTokenSilent, loginSaga, logoutSaga } from './saga';
import { postLogin, getAuthToken, removeToken } from 'services/auth';
import * as actionSelectors from './slice';

describe('Auth Saga', () => {
    it('should setup the watchers', () => {
        const gen = authSaga();
        expect(gen.next().value).toEqual(all([
            fork(loadTokenSilent),
            takeLatest(actionSelectors.login.type, loginSaga),
            takeLatest(actionSelectors.logout.type, logoutSaga)
        ]));
    });

    beforeEach(() => {
    });

    it('should trigger relevant actions when LOGIN request succeed', () => {
        const payload = {email:'asdf', pass:'asdf'};
        const response = {data: {auth_token: 'sadfasdfasdf1232asdfae'}};
        const gen = loginSaga({payload});
        expect(gen.next().value).toEqual(call(postLogin, payload));
        expect(gen.next(response).value).toEqual(put(actionSelectors.success(response.data)));
    });

    it('should trigger relevant actions when LOGIN request fails', () => {
        const payload = {email:'asdf', pass:'asdf'};
        const gen = loginSaga({payload});
        const error = {status: 400, message: 'test'};
        expect(gen.next().value).toEqual(call(postLogin, payload));
        expect(gen.throw(error).value).toEqual(put(actionSelectors.error(error)));
    });

    it('should trigger relevant actions when LOGOUT method is requested', () => {    
        const gen = logoutSaga();
        expect(gen.next().value).toEqual(put(actionSelectors.init()));
        expect(gen.next().value).toEqual(call(removeToken));
    });

    it('should trigger load access token from local storage on reload', () => {
        const gen = loadTokenSilent();
        const token = 'faketoken';
        expect(gen.next().value).toEqual(call(getAuthToken));
        expect(gen.next(token).value).toEqual(put(actionSelectors.success({auth_token: token})));
    })
});
