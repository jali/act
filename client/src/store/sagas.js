import { all } from 'redux-saga/effects';
import authSaga from 'features/auth/saga';
import profileSaga from 'features/profile/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        profileSaga()
    ]);
}
