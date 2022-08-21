import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as actionSelectors from './slice';
import { getVisionList } from 'services/vision';

// export function getVisionDataFromState(state) {
//     return state.vision.data;
// }

export function* getVisionListSaga() {
    try {
        const vResponse = yield call(getVisionList);
        yield put(actionSelectors.success(vResponse.data.visionInfo));
    } catch (error) {
        // handle error
        yield put(actionSelectors.error(error.response));
    }
}


export default function* visionListSaga() {
    yield all([
        takeLatest(actionSelectors.load.type, getVisionListSaga)
    ]);
}
