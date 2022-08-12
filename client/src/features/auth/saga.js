import { all, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import * as actionSelectors from './slice';

export function postLogin(data, config) {
    return axios.post('http://localhost:8081/login', data, config);
}

export function* loginSaga(action) {
    const payload = {...action.payload};
    const config = {
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    };

    try {
        const loginResponse = yield call(postLogin, payload, config);
        yield put(actionSelectors.success(loginResponse.data));
    } catch (error) {
        // handle error
        yield put(actionSelectors.error(error));
    }
}

export function* logoutSaga() {
    yield put(actionSelectors.init());
}

export default function* authSaga() {
    yield all([
        // fork(loadTokenSilent),
        takeLatest(actionSelectors.login.type , loginSaga),
        takeLatest(actionSelectors.logout.type , logoutSaga)
    ]);
}
