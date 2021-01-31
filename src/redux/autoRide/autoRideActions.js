import {
    REQUEST_AUTO_RIDE,
    SUCCESS_AUTO_RIDE,
    FAILURE_AUTO_RIDE
} from './autoRideTypes'
import { firestore } from '../../firebase/firebase'
import firebase from 'firebase'

export const requestAutoRide = () => {
    return{
        type: REQUEST_AUTO_RIDE
    }
}

export const successAutoRide = (msg) => {
    return{
        type: SUCCESS_AUTO_RIDE,
        payload: msg
    }
}

export const failureAutoRide = (err) => {
    return{
        type: FAILURE_AUTO_RIDE,
        payload: err
    }
}

export const autoRide = (ride) => (dispatch) => {
        dispatch(requestAutoRide)
        
        const ridetime = dateToFirebaseTimeStamp(ride.rideDetail.rideDate, ride.rideDetail.rideTime)
        const endtime = ride.rideDetail.isRideTwoWay 
                        ?  dateToFirebaseTimeStamp(ride.rideDetail.endDate, ride.rideDetail.endTime) 
                        : null

        const rideDetails = {
            pickUp: {
                Address: ride.rideDetail.pickupAddress,
                City: ride.rideDetail.pickupCity
            },
            destination: {
                Address: ride.rideDetail.destAddress,
                City: ride.rideDetail.destCity
            },
            isRideTwoWay: ride.rideDetail.isRideTwoWay,
            rideTime: ridetime,
            returnTime: endtime            
        }

        firestore.collection('ride-request').add(
            rideDetails
        )
        .then(
            dispatch(successAutoRide("Your ride request has been submitted successfully."))
        )
        .catch(error => {
                dispatch(failureAutoRide(error))
            }
        )
}

const dateToFirebaseTimeStamp = (fulldate, time) => {
    const d = fulldate.split("-")
    const year = d[0]
    const month = parseInt(d[1]) - 1
    const date = d[2]


    const t = time.split(":")
    const hour = t[0]
    const minute = t[1]

    return firebase.firestore.Timestamp.fromDate(new Date(year, month, date, hour, minute))
}
