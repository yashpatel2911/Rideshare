import * as ActionTypes from "./ActionTypes";

export const Rides = (
  state = {
    isLoading: true,
    errMess: null,
    rides: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_RIDES_REQUEST:
      return { ...state, isLoading: true, errMess: null, rides: [] };

    case ActionTypes.FETCH_RIDES:
      return { ...state, isLoading: false, errMess: null, rides: action.rides };

    case ActionTypes.FETCH_RIDES_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload, rides: [] };

    default:
      return state;
  }
};
