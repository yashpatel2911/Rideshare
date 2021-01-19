import {
    UPDATE_DISPLAY_NAME_REQUEST,
    UPDATE_DISPLAY_NAME_SUCCESS,
    UPDATE_DISPLAY_NAME_FAILURE
} from './updateProfileTypes'

export const updateDisplayNameRequest = () => {
    return{
        type: UPDATE_DISPLAY_NAME_REQUEST
    }
}

export const updateDisplayNameSuccess = msg => {
    return{
        type: UPDATE_DISPLAY_NAME_SUCCESS,
        payload: msg
    }
}

export const updateDisplayNameFailure = error => {
    return{
        type: UPDATE_DISPLAY_NAME_FAILURE,
        payload: error
    }
}
