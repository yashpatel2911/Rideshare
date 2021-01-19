import { 
    UPDATE_DISPLAY_NAME_FAILURE, 
    UPDATE_DISPLAY_NAME_REQUEST, 
    UPDATE_DISPLAY_NAME_SUCCESS 
} from "./updateProfileTypes"

const initialState = {
    isLoading: false,
    isAuthenticated: 
}

export const updateProfileReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_DISPLAY_NAME_REQUEST: return {

        }
        case UPDATE_DISPLAY_NAME_SUCCESS: return {

        }
        case UPDATE_DISPLAY_NAME_FAILURE: return {

        }
        default: return state
    }
}
