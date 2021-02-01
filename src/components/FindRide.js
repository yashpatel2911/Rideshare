import React, { Component } from 'react';
import { Form, FormGroup, Input,Button } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';


class FindRide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            src: "",
            dst: ""
        }
    }

    handleSubmit = (event) => {
        
        this.props.findRide(this.state);
        event.preventDefault();
        this.setState({
            src: "",
            dst: ""
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
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>    
                            <Input type="text" id="src" name="src"  placeholder="From"
                                onChange={this.updateInput} value={this.state.src}/>
                        </FormGroup>
                        <FormGroup>
                            
                            <Input type="text" id="dst" name="dst" placeholder="To"
                                onChange={this.updateInput} value={this.state.dst}  />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Search</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default FindRide;