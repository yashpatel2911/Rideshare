import React, { Component } from 'react';
import { autoRide } from '../redux/autoRide/autoRideActions'

class RideRequest extends Component {

    constructor(props){
        super(props)

        const tomorrowDate = this.tomorrowDate()
        console.log(props)

        this.state = {
            pickupAddress: "",
            pickupCity: "",
            destAddress: "",
            destCity: "",
            isRideTwoWay: false,
            rideDate: tomorrowDate,
            rideTime: "06:00",
            returnDate: tomorrowDate,
            returnTime: "06:00"
        }
    }

    tomorrowDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrow_date = tomorrow.getFullYear() + "-" + parseInt(tomorrow.getMonth())+1 + "-" + tomorrow.getDate()
        return tomorrow_date
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleChange = e => {
        this.setState({ 
            [e.target.name]: e.target.checked
        })
    }

    sendRequest = e => {
        e.preventDefault();
        
        // Printing the output on console
        console.log(this.state)

        // Inserting the request into database
        this.props.autoRideRequest({ rideDetail:this.state })

        const tomorrowDate = this.tomorrowDate()
        this.setState({
            pickupAddress: "",
            pickupCity: "",
            destAddress: "",
            destCity: "",
            isRideTwoWay: false,
            rideDate: tomorrowDate,
            rideTime: "06:00",
            returnDate: tomorrowDate,
            returnTime: "06:00"
        })
    }

    render(){
        return(
            <form onSubmit={this.sendRequest}>
                <div>
                    <div>Pickup Details</div>
                    <div>
                        Address
                        <input type="text" name="pickupAddress" onChange={this.updateInput} value={this.state.pickupAddress} required />
                    </div>
                    <div>
                        City
                        <input type="text" name="pickupCity" onChange={this.updateInput} value={this.state.pickupCity} required />
                    </div>
                    <div>Destination Details</div>
                    <div>
                        Address
                        <input type="text" name="destAddress" onChange={this.updateInput} value={this.state.destAddress} required />
                    </div>
                    <div>
                        City
                        <input type="text" name="destCity" onChange={this.updateInput} value={this.state.destCity} required />
                    </div>
                    <div>
                        Do you a return ride as well?
                        <input type="checkbox" name="isRideTwoWay" onChange={this.handleChange} checked={this.state.isRideTwoWay}/>
                    </div>
                    <div>
                        Time of Ride
                        <input type="date" name="rideDate" min={this.state.rideDate} onChange={this.updateInput} value={this.state.rideDate} required />
                        <input type="time" name="rideTime" onChange={this.updateInput} value={this.state.rideTime} required />
                    </div>
                    {
                        this.state.isRideTwoWay ?
                        <div>
                            Return Ride Details
                            <input type="date" name="returnDate" min={this.state.rideDate} onChange={this.updateInput} value={this.state.returnDate} required />
                            <input type="time" name="returnTime" onChange={this.updateInput} value={this.state.returnTime} required />
                        </div>
                        : null
                    }
                    <button type="submit">Request Ride</button>
                </div>
            </form>
        )
    }
}

export default RideRequest
