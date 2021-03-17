import React, { Component } from 'react';
import { Form, FormGroup, Input,Button, Label } from 'reactstrap';
import { getDateN } from '../extraFunctionalities/extraFunctionalities'
import { withRouter } from 'react-router-dom'

//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';

class PostRide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            src: "",
            dst: "",
            rideDate: getDateN(1),
            rideTime: "06:00",
            userID: ""
        }
    }

    componentDidMount() {
        var user = JSON.parse(localStorage.getItem('user'));

        if (!user){
            this.props.history.push('/login')
        }
        else {
            this.setState({
                userID: user.uid
            })
        }
    }

    handleSubmit = (event) => {
        
        this.props.postRide(this.state)
        event.preventDefault()
        
        this.setState({
            src: "",
            dst: "",
            rideDate: getDateN(1),
            rideTime: "06:00",
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <h1>Post a trip</h1>  
                </div>
                <hr style={{width:'15%', margin:'50px 0px 50px 0px'}} />

                <div className="row">
                    <h2>Itinerary</h2>
                </div>
                    
                <div className="row">
                    <p>Your origin, destination, and stops you're willing to make along the way.</p>
                </div>
                    
                <div className="row">
                    <Form onSubmit={this.handleSubmit}>
                        
                        <FormGroup>
                            <Label>Origin</Label>
                            <Input type="text" id="src" name="src"  placeholder="Enter an Origin"
                                onChange={this.handleChange} value={this.state.src} required/>  
                        </FormGroup>
                        <FormGroup>
                            <Label>Destination</Label>
                            <Input type="text" id="dst" name="dst" placeholder="Enter a destination"
                                onChange={this.handleChange} value={this.state.dst} required/>
                        </FormGroup>
                        <FormGroup>
                            <Label>Date</Label>
                            <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.handleChange} 
                                value={this.state.rideDate} required />
                        </FormGroup>
                        <FormGroup>
                            <Label>Time</Label>
                            <Input type="time" name="rideTime" onChange={this.handleChange} 
                                value={this.state.rideTime} required />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Post</Button>
                        
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter (PostRide);