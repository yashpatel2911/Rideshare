import React, { Component } from 'react';
import { Form, FormGroup, Input,Button } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';


class FindRide extends Component {

    constructor(props) {
        super(props);

        const tomorrowDate = this.tomorrowDate();

        this.state = {
            src: "",
            dst: "",
            rideDate: tomorrowDate,
            rideTime: "06:00"
        }
    }

    handleSubmit = (event) => {
        
        this.props.findRide(this.state);
        event.preventDefault();
        
        const tomorrowDate = this.tomorrowDate()

        this.setState({
            src: "",
            dst: "",
            rideDate: tomorrowDate,
            rideTime: "06:00"
        })
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

    render() {

        const ride = this.props.rides.rides.map((ride) => {
            return (
                <div key={ride._id} >
                    <p>{ride._id}</p>
                    <p>{ride.src}</p>
                    <p>{ride.dst}</p>
                </div>
            )
        })
        return(
            <div className="container">
                <div className="row">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>    
                            <Input type="text" id="src" name="src"  placeholder="From"
                                onChange={this.updateInput} value={this.state.src}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" id="dst" name="dst" placeholder="To"
                                onChange={this.updateInput} value={this.state.dst}  />
                        </FormGroup>
                        <FormGroup>
                            <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.updateInput} 
                                value={this.state.rideDate} required />
                        </FormGroup>
                        <FormGroup>
                            <Input type="time" name="rideTime" onChange={this.updateInput} 
                                value={this.state.rideTime} required />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Search</Button>
                    </Form>
                    <div className="row">
                        <span>{ride}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default FindRide;