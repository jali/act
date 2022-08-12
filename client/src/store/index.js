import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { ENABLE_REDUX_DEBUGGING } from 'config';

const sagaMiddleware = createSagaMiddleware();

const middleware = (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware);

const preloadedState = {};

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: ENABLE_REDUX_DEBUGGING,
    preloadedState,
});

sagaMiddleware.run(rootSaga);

export default store;
