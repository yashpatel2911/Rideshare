import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Input, FormGroup, Label } from 'reactstrap'
import { isUserLoggedIn, redirectPage } from '../extraFunctionalities/extraFunctionalities'
import queryString from 'querystring'

class SignUp extends Component {

    constructor(props){
        super(props)

        let nextURL = queryString.parse(this.props.location.search)['?url']

        if(isUserLoggedIn(this.props.store)){
            this.redirectPage(this.props.history, nextURL)
            return
        }

        this.state = {
            email:"",
            password:"",
            confirmPassword:"",
            msg: ""
        }
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if(this.state.password !== this.state.confirmPassword){
            this.setState({
                msg: "Password and Confirm Password are not matching."
            })
        }
        else{
            
            alert("You are successfully signed up.")
        }

    }

    handleGoogleLogin = (e) => {
        e.preventDefault()
        this.props.store.googleLogin()
    }

    render() {
        if(isUserLoggedIn(this.props.store)){
            return null
        }
        return(
            <Form onSubmit={this.handleSubmit}>
                <h2>{this.state.msg}</h2>
                <FormGroup><Label>Email</Label>
                <Input type='email' name='email' placeholder='abc@xyz.com' onChange={this.updateInput} />
                </FormGroup>
                <FormGroup><Label>Password</Label>
                <Input type='password' name='password' placeholder='Enter your password here.' onChange={this.updateInput}/>
                </FormGroup>
                <FormGroup>
                <Label>Confirm Password</Label>
                <Input type='password' name='confirmPassword' placeholder='Enter your password again.' onChange={this.updateInput}/>
                </FormGroup>
                <FormGroup>
                <Button type='submit'>Sign up</Button>
                <p>------------------------------------OR---------------------------------</p>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span>Sign up with Google</Button>
                </FormGroup>
            </Form>
        )
    }

}

export default withRouter(SignUp)
