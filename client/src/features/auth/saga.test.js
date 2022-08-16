import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import authSaga, { loadTokenSilent, loginSaga, logoutSaga } from './saga';
import { hasTokenExpired, saveToken, decodedTokenData, postLogin, getAuthToken, removeToken } from 'services/auth';
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
        const authData = {exp: 123123123, _id: '62deb31ceee7ee9f812aeff2', username: 'jalal', role: 'Team'};
        const gen = loginSaga({payload});
        
        expect(gen.next().value).toEqual(call(postLogin, payload));
        expect(gen.next(response).value).toEqual(call(decodedTokenData, response.data.auth_token));
        expect(gen.next(authData).value).toEqual(put(actionSelectors.success({...response.data, ...authData})));
        expect(gen.next().value).toEqual(call(saveToken, response.data));
    });

    it('should trigger relevant actions when LOGIN request fails', () => {
        const payload = {email:'asdf', pass:'asdf'};
        const gen = loginSaga({payload});
        const err = {response: {status: 401, data: {info:'test'}}};
        expect(gen.next().value).toEqual(call(postLogin, payload));
        expect(gen.throw(err).value).toEqual(put(actionSelectors.error(err.response)));
    });

    it('should trigger relevant actions when LOGOUT method is requested', () => {    
        const gen = logoutSaga();
        expect(gen.next().value).toEqual(put(actionSelectors.init()));
        expect(gen.next().value).toEqual(call(removeToken));
    });

    it('should trigger load not expired access token from local storage on reload', () => {
        const gen = loadTokenSilent();
        const token = 'faketoken';
        const authData = {exp: 4090589513, _id: '62deb31ceee7ee9f812aeff2', username: 'jalal', role: 'Team'};
        expect(gen.next().value).toEqual(call(getAuthToken));
        expect(gen.next(token).value).toEqual(call(decodedTokenData, token));
        expect(gen.next(authData).value).toEqual(call(hasTokenExpired, authData.exp));
        expect(gen.next(false).value).toEqual(put(actionSelectors.success({auth_token: token, ...authData})));
    });

    it('should trigger load expired access token from local storage on reload', () => {
        const gen = loadTokenSilent();
        const token = 'faketoken';
        const authData = {exp: 1660668713, _id: '62deb31ceee7ee9f812aeff2', username: 'jalal', role: 'Team'};
        expect(gen.next().value).toEqual(call(getAuthToken));
        expect(gen.next(token).value).toEqual(call(decodedTokenData, token));
        expect(gen.next(authData).value).toEqual(call(hasTokenExpired, authData.exp));
        expect(gen.next(true).value).toEqual(call(removeToken));
    });
});
