import { createSelector, createSlice } from '@reduxjs/toolkit';

export const initialState = {
    data: null,
    loading: false,
    success: false,
    error: null
};

const auth = createSlice({
    name: 'auth',
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
        login(state) {
            state.loading = true;
            state.success = false;
            state.error = null;
        },
        logout(state) {
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

export const {init, load, login, logout, success, error} = auth.actions;

const selectDomain = (state) => state.auth || initialState;
export const selectLoading = createSelector([selectDomain], state => state.loading);
export const selectSuccess = createSelector([selectDomain], state => state.success);
export const selectError = createSelector([selectDomain], state => state.error);
export const selectData = createSelector([selectDomain], state => state.data);

export default auth.reducer;
