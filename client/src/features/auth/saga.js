import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { postLogin, saveToken, getAuthToken, removeToken } from 'services/auth';
import * as actionSelectors from './slice';

export function* loginSaga(action) {
    const payload = {...action.payload};
    try {
        const loginResponse = yield call(postLogin, payload);
        yield put(actionSelectors.success(loginResponse.data));
        yield call(saveToken, loginResponse.data)
    } catch (error) {
        // handle error
        yield put(actionSelectors.error(error));
    }
}

export function* logoutSaga() {
    yield put(actionSelectors.init());
    yield call(removeToken);
}

export function* loadTokenSilent() {
    const token = yield call(getAuthToken);
    if (token) {
        yield put(actionSelectors.success({auth_token: token}));
    }
}

export default function* authSaga() {
    yield all([
        fork(loadTokenSilent),
        takeLatest(actionSelectors.login.type , loginSaga),
        takeLatest(actionSelectors.logout.type , logoutSaga)
    ]);
}
