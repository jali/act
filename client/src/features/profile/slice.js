import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    data: null,
    loading: false,
    success: false,
    saved: false,
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
            state.saved = false;
        },
        load(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
            state.saved = false;
        },
        save(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
            state.saved = false;
        },
        saved(state) {
            state.error = null;
            state.success = true;
            state.loading = false;
            state.saved = true;
        },
        success(state, action) {
            state.data = action.payload;
            state.error = null;
            state.success = true;
            state.loading = false;
            state.saved = false;
        },
        error(state, action) {
            state.loading = false;
            state.success = false;
            state.error = action.payload;
            state.saved = false;
        }
    }
});

export const {init, load, save, saved, success, error} = profile.actions;

const selectDomain = (state) => state.profile || initialState;
export const selectLoading = createSelector([selectDomain], state => state.loading);
export const selectSuccess = createSelector([selectDomain], state => state.success);
export const selectError = createSelector([selectDomain], state => state.error);
export const selectData = createSelector([selectDomain], state => state.data);
export const selectSaved = createSelector([selectDomain], state => state.saved);

export default profile.reducer;
