import * as ActionTypes from './ActionTypes';

export const Rides = (state = {
        isLoading: true,
        errMess: null,
        rides: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_RIDES:
            return {...state, isLoading: false, errMess: null, rides: action.rides};

        default:
            return state;
    }
}