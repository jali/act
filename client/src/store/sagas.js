import { all } from 'redux-saga/effects';
import authSaga from 'features/auth/saga';
import profileSaga from 'features/profile/saga';
import visionListSaga from 'features/vision-list/saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        profileSaga(),
        visionListSaga()
    ]);
}
