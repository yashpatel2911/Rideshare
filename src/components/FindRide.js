import React, { Component } from 'react';
import { Form, FormGroup, Input,Button } from 'reactstrap';
//import { Link } from 'react-router-dom';
//import { Control, Form, Errors } from 'react-redux-form';


class FindRide extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        
        this.props.postFindRide({src: this.src.value, dst: this.dst.value});
        event.preventDefault();
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            
                            <Input type="text" id="src" name="src"  placeholder="From"
                                innerRef={(input) => this.src = input} />
                        </FormGroup>
                        <FormGroup>
                            
                            <Input type="text" id="dst" name="dst" placeholder="To"
                                innerRef={(input) => this.dst = input}  />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary">Search</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default FindRide;