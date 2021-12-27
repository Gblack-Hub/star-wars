import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchResults: [],
    searchType: "",
    loading: false,
    success: false,
    failure: false,
    error: null,
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchRequest: (state = initialState) => {
            state.loading = true;
        },
        searchSuccess: (state, { payload }) => {
            state.searchResults = payload.results;
            state.searchType = payload.searchType;
            state.success = true;
            state.loading = false;
            state.failure = false;
        },
        searchFailure: (state, { payload }) => {
            state.failure = true;
            state.loading = false;
            state.success = false;
            state.error = payload;
        },
    }
})

//actions
export const { searchRequest, searchSuccess, searchFailure } = searchSlice.actions

//selectors
export const searchSelector = state => state

//reducer
export default searchSlice.reducer


//Asynchronous thunk action
export const initiateSearch = (searchData) => {
    return async dispatch => {
        dispatch(searchRequest())

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}${searchData.searchType}/?search=${searchData.searchTerm}&page=${1}`)

            if (!response.ok) {
                dispatch(searchFailure('Network response was not OK'));
            }

            const {results} = await response.json();

            let data = {
                results,
                searchType: searchData.searchType
            }

            dispatch(searchSuccess(data));

        } catch (error) {
            dispatch(searchFailure(error.message));
        }
    }
}