import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { getDateN } from '../extraFunctionalities/extraFunctionalities'
//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';


class FindRide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            src: "",
            dst: "",
            rideDate: getDateN(1),
            rideTime: "06:00"
        }
    }

    handleSubmit = (event) => {
        
        this.props.findRide(this.state);
        event.preventDefault();

        this.setState({
            src: "",
            dst: "",
            rideDate: getDateN(1),
            rideTime: "06:00"
        })
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {

        return(
            <div className="container">
                <div className="row">
                    <h1>Search a Ride</h1>  
                </div>
                <hr style={{width:'15%', margin:'50px 0px 50px 0px'}} />

                <div className="row">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>    
                            <Label>Origin</Label>
                            <Input type="text" id="src" name="src"  placeholder="Enter an Origin"
                                onChange={this.updateInput} value={this.state.src} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Destination</Label>
                            <Input type="text" id="dst" name="dst" placeholder="Enter a destination"
                                onChange={this.updateInput} value={this.state.dst} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Date</Label>
                            <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.updateInput} 
                                value={this.state.rideDate} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input type="time" name="rideTime" onChange={this.updateInput} 
                                value={this.state.rideTime} required />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Search</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default FindRide;