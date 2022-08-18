import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionSelectors from './slice';
import { getProfile, postProfile } from 'services/profile';



export function getProfileDataFromState(state) {
    return state.profile.data;
}

export function* getProfileSaga() {
    try {
        const profileResponse = yield call(getProfile);
        yield put(actionSelectors.success(profileResponse.data.profileInfo));
    } catch (error) {
        // handle error
        yield put(actionSelectors.error(error.response));
    }
}

export function* saveProfileSaga(action) {
    try {
        const response = yield call(postProfile, action.payload);
        yield put(actionSelectors.success(response));
    } catch (e) {
        yield put(actionSelectors.error(e.response));
    }
}

export default function* profileSaga() {
    yield all([
        takeLatest(actionSelectors.load.type, getProfileSaga),
        takeLatest(actionSelectors.save.type, saveProfileSaga)
    ]);
}
