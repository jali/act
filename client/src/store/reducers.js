import { combineReducers } from 'redux';
import auth from 'features/auth/slice';
import profile from 'features/profile/slice';
import visionList from 'features/vision-list/slice';

const rootReducer = combineReducers({
    auth,
    profile,
    visionList
});

export default rootReducer;
