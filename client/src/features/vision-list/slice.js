import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    data: null,
    loading: false,
    success: false,
    error: null
};

const visionList = createSlice({
    name: 'visionList',
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

export const {init, load, success, error} = visionList.actions;

const selectDomain = (state) => state.visionList || initialState;
export const selectLoading = createSelector([selectDomain], state => state.loading);
export const selectSuccess = createSelector([selectDomain], state => state.success);
export const selectError = createSelector([selectDomain], state => state.error);
export const selectData = createSelector([selectDomain], state => state.data);

export default visionList.reducer;
