import { combineReducers } from 'redux';
import auth from 'features/auth/slice';

const rootReducer = combineReducers({
    auth
});

export default rootReducer;
