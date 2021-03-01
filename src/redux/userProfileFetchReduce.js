import {
    FETCH_USER_PROFILE_REQUEST,
    FETCH_USER_PROFILE_SUCCESS,
    FETCH_USER_PROFILE_FAILURE,
    UPDATE_USER_PROFILE_REQUEST,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAILURE
} from './ActionTypes'

const initialState = {
    isLoading: false,
    userProfile: null,
    msg: null
}

export const UserProfile = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PROFILE_REQUEST: return {isLoading: true, userProfile: null, msg: null}
        case FETCH_USER_PROFILE_SUCCESS: return {isLoading: false, userProfile: action.payload, msg: null}
        case FETCH_USER_PROFILE_FAILURE: return {isLoading: false, userProfile: null, msg: action.payload}
        case UPDATE_USER_PROFILE_REQUEST: return {...state, isLoading: true, msg: null}
        case UPDATE_USER_PROFILE_SUCCESS: return {...state, isLoading: false, msg: action.payload}
        case UPDATE_USER_PROFILE_FAILURE: return {...state, isLoading: false, msg: action.payload}
        default: return state;
    }
}