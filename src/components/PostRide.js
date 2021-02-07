import React, { Component } from 'react';
import { Form, FormGroup, Input,Button } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';


class PostRide extends Component {

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

    handleSubmit = (event) => {
        
        this.props.postRide(this.state);
        event.preventDefault();

        const tomorrowDate = this.tomorrowDate()
        
        this.setState({
            src: "",
            dst: "",
            rideDate: tomorrowDate,
            rideTime: "06:00"
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
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Input type="text" id="src" name="src"  placeholder="From"
                                onChange={this.handleChange} value={this.state.src}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="text" id="dst" name="dst" placeholder="To"
                                onChange={this.handleChange} value={this.state.dst}/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="date" name="rideDate" min={this.state.rideDate} onChange={this.handleChange} 
                                value={this.state.rideDate} required />
                        </FormGroup>
                        <FormGroup>
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

export default PostRide;