import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    data: null,
    loading: false,
    success: false,
    error: null
};

const profile = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {
        init(state) {
            state.data = null;
            state.success = false;
            state.error = null;
            state.loading = false;
        },
        load(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        save(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        success(state, action) {
            state.data = action.payload;
            state.error = null;
            state.success = true;
            state.loading = false;
        },
        error(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        }
    }
});

export const {init, load, save, success, error} = profile.actions;

const selectDomain = (state) => state.profile || initialState;
export const selectLoading = createSelector([selectDomain], state => state.loading);
export const selectSuccess = createSelector([selectDomain], state => state.success);
export const selectError = createSelector([selectDomain], state => state.error);
export const selectData = createSelector([selectDomain], state => state.data);

export default profile.reducer;
