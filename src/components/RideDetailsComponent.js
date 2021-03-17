import { Component } from 'react'

class RideDetails extends Component {

    constructor(props){
        super(props)

        this.state = {
            rideID: "abc"
        }
    }

    render() {
        return(
            <>
            <h1>{this.state.rideID}</h1>
            </>
        )
    }

}

export default RideDetails