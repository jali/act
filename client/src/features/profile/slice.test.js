import reducer, * as sliceActionSelectors from './slice';

describe('Auth Slice - reducer, actions and selectors', () => {
    it('should return the initial state on first run', () => {
        const nextState = sliceActionSelectors.initialState;
        const result = reducer(undefined, {});
        expect(result).toEqual(nextState);
    });

    it('should set init', () => {
        const nextState = reducer(sliceActionSelectors.initialState, sliceActionSelectors.init());
        const rootState = {auth: nextState};
        expect(sliceActionSelectors.selectLoading(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectSuccess(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectError(rootState)).toEqual(null);
        expect(sliceActionSelectors.selectData(rootState)).toEqual(null);
    });

    it('should set loading - load', () => {
        const nextState = reducer(sliceActionSelectors.initialState, sliceActionSelectors.load());
        const rootState = {auth: nextState};
        expect(sliceActionSelectors.selectLoading(rootState)).toEqual(true);
        expect(sliceActionSelectors.selectSuccess(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectError(rootState)).toEqual(null);
        expect(sliceActionSelectors.selectData(rootState)).toEqual(null);
    });

    it('should set loading when login', () => {
        const nextState = reducer(sliceActionSelectors.initialState, sliceActionSelectors.login());
        const rootState = {auth: nextState};
        expect(sliceActionSelectors.selectLoading(rootState)).toEqual(true);
        expect(sliceActionSelectors.selectSuccess(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectError(rootState)).toEqual(null);
        expect(sliceActionSelectors.selectData(rootState)).toEqual(null);
    });

    it('should set loading when logout', () => {
        const nextState = reducer(sliceActionSelectors.initialState, sliceActionSelectors.logout());
        const rootState = {auth: nextState};
        expect(sliceActionSelectors.selectLoading(rootState)).toEqual(true);
        expect(sliceActionSelectors.selectSuccess(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectError(rootState)).toEqual(null);
        expect(sliceActionSelectors.selectData(rootState)).toEqual(null);
    });

    it('should set success - success', () => {
        const payload = {data: 'test'};
        const nextState = reducer(sliceActionSelectors.initialState, sliceActionSelectors.success(payload));
        const rootState = {auth: nextState};
        expect(sliceActionSelectors.selectSuccess(rootState)).toEqual(true);
        expect(sliceActionSelectors.selectLoading(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectError(rootState)).toEqual(null);
        expect(sliceActionSelectors.selectData(rootState)).toEqual(payload);
    });

    it('should set error - error', () => {
        const payload = {error: 'test'};
        const nextState = reducer(sliceActionSelectors.initialState, sliceActionSelectors.error(payload));
        const rootState = {auth: nextState};
        expect(sliceActionSelectors.selectLoading(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectSuccess(rootState)).toEqual(false);
        expect(sliceActionSelectors.selectData(rootState)).toEqual(null);
        expect(sliceActionSelectors.selectError(rootState)).toEqual({error: 'test'});
    });
});
