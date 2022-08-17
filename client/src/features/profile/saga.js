import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import * as actionSelectors from './slice';
import { getProfile } from 'services/profile';



export function getProfileDataFromState(state) {
    return state.profile.data;
}

export function* getProfileSaga() {
    try {
        const profileResponse = yield call(getProfile);
        yield put(actionSelectors.success(profileResponse.data.profileInfo));
    } catch (error) {
        // handle error
        yield put(actionSelectors.error(error));
    }
}

export default function* profileSaga() {
    yield all([
        takeLatest(actionSelectors.load.type, getProfileSaga)
        // takeLatest(actionSelectors.save.type, saveProfileSaga)
    ]);
}
