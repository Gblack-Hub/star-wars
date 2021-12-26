import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: {},
    loading: false,
    success: false,
    failure: false,
    error: null,
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state = initialState) => {
            state.loading = true;
        },
        getUsersSuccess: (state, { payload }) => {
            state.users = payload;
            state.success = true;
            state.loading = false;
            state.failure = false;
        },
        getUsersFailure: (state, { payload }) => {
            state.failure = true;
            state.loading = false;
            state.success = false;
            let err = JSON.parse(payload) //convert string back to object
            state.error = err?.data;
        },
    }
})

//actions
export const { getUsers, getUsersSuccess, getUsersFailure } = usersSlice.actions

//selectors
export const usersSelector = state => state

//reducer
export default usersSlice.reducer


//Asynchronous thunk action
export function fetchUsers(postData) {
    return async dispatch => {
        dispatch(getUsers())

        try {
            const result = await fetch(`${process.env.REACT_APP_BASE_URL}auth/account/admin/paginated/filter`, postData);
            let data = result?.data;

            dispatch(getUsersSuccess(data));
        } catch (error) {
            let err = JSON.stringify(error.response); //convert object to string to enable dispatch
            dispatch(getUsersFailure(err));
        }
    }
}