import {
    REQUEST_AUTO_RIDE,
    SUCCESS_AUTO_RIDE,
    FAILURE_AUTO_RIDE
} from './autoRideTypes'

const initialState = {
    isLoading: false,
}

export const AutoRide = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_AUTO_RIDE: return{
            ...state,
            isLoading: true
        }
        case SUCCESS_AUTO_RIDE: return{
            ...state,
            isLoading: false
        }
        case FAILURE_AUTO_RIDE: return{
            ...state,
            isLoading: false
        }    
        default: return state
    }
}

export default AutoRide
