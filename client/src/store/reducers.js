import { combineReducers } from 'redux';
import auth from 'features/auth/slice';
import profile from 'features/profile/slice';

const rootReducer = combineReducers({
    auth,
    profile
});

export default rootReducer;
