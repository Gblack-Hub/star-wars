import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loggedInUserData: null,
    loading: false,
    success: false,
    failure: false,
    error: null,
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginRequest: (state = initialState) => {
            state.loading = true;
        },
        loginSuccess: (state, { payload }) => {
            state.loggedInUserData = payload;
            state.success = true;
            state.loading = false;
            state.failure = false;
            window.localStorage.setItem("isLoggedIn", true);
            window.localStorage.setItem("loggedInUserData", JSON.stringify(payload));
        },
        loginFailure: (state, { payload }) => {
            state.failure = true;
            state.loading = false;
            state.success = false;
            state.error = payload;
        },
    }
})

//actions
export const { loginRequest, loginSuccess, loginFailure } = loginSlice.actions

//selectors
export const loginSelector = state => state

//reducer
export default loginSlice.reducer


//Asynchronous thunk action
export const login = (loginData) => {
    return async dispatch => {
        dispatch(loginRequest())

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}people/?search=${loginData.characterName}`)

            if (!response.ok) {
                dispatch(loginFailure('Network response was not OK'));
            }

            const {results} = await response.json();
            
            let invalidConditions = results.length < 1 || (results[0].name !== loginData.characterName && results[0].birth_year !== loginData.birthYear);

            if(invalidConditions){
                return dispatch(loginFailure('Invalid details entered'));
            }

            dispatch(loginSuccess(results[0]));

        } catch (error) {
            dispatch(loginFailure(error.message));
        }
    }
}