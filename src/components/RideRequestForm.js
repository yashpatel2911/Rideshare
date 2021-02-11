import React, { Component } from 'react'
import { Form, FormGroup, Input,Button, Label } from 'reactstrap';

class RideRequest extends Component {

    constructor(props){
        super(props)

        const tomorrowDate = this.tomorrowDate()

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
        const tomorrow_date = tomorrow.getFullYear() + "-" + this.padZero(parseInt(tomorrow.getMonth())+1) + "-" + this.padZero(tomorrow.getDate())
        return tomorrow_date
    }

    padZero = e => {
        const remainder = parseInt(parseInt(e) / 10)
        if(remainder !== 0) return e
        else return "0"+e
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

        // Inserting the request into database
        this.props.autoRideRequest({ rideDetail:this.state })

        const tomorrowDate = this.tomorrowDate()

        // Setting back to the original state
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
            <div className="container">
            <Form onSubmit={this.sendRequest}>
                <div>
                    
                    <div><Label>Pickup Details</Label></div>
                    <div>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input type="text" name="pickupAddress" onChange={this.updateInput} value={this.state.pickupAddress} required />
                        </FormGroup>
                    </div>
                    <div>
                    <FormGroup>
                        <Label>City</Label>
                        <Input type="text" name="pickupCity" onChange={this.updateInput} value={this.state.pickupCity} required />
                        </FormGroup>
                    </div>
                    <div><Label>Destination Details</Label></div>
                    <div>
                    <FormGroup>
                        <Label>Address</Label>
                        <Input type="text" name="destAddress" onChange={this.updateInput} value={this.state.destAddress} required />
                    </FormGroup>
                    </div>
                    <div>
                    <FormGroup>
                        <Label>City</Label>
                        <Input type="text" name="destCity" onChange={this.updateInput} value={this.state.destCity} required />
                    </FormGroup>
                    </div>
                    <div>
                    <FormGroup>
                        <Label>
                        Do you a return ride as well?</Label>
                        <Input type="checkbox" name="isRideTwoWay" onChange={this.handleChange} checked={this.state.isRideTwoWay}/>
                    </FormGroup>
                    </div>
                    <div>
                    <FormGroup>
                        <Label>
                        Time of Ride</Label>
                        <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.updateInput} value={this.state.rideDate} required />
                        <Input type="time" name="rideTime" onChange={this.updateInput} value={this.state.rideTime} required />
                    </FormGroup>
                    </div>
                    {
                        this.state.isRideTwoWay ?
                        <div>
                            <FormGroup><Label>
                            Return Ride Details</Label>
                            <Input type="date" name="returnDate" min={this.state.rideDate} onChange={this.updateInput} value={this.state.returnDate} required />
                            <Input type="time" name="returnTime" onChange={this.updateInput} value={this.state.returnTime} required />
                            </FormGroup>
                        </div>
                        : null
                    }
                    <FormGroup>
                        <Button type="submit" color="primary">Request Ride</Button>
                    </FormGroup>
                </div>
            </Form>
            </div>
        )
    }
}

export default RideRequest
