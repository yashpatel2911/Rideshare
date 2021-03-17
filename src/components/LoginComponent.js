import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { isUserLoggedIn, redirectPage } from '../extraFunctionalities/extraFunctionalities'
import queryString from 'querystring'
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'

class LoginComponent extends Component{

    constructor(props){
        super(props)

        let nextURL = queryString.parse(this.props.location.search)['?url']

        if(isUserLoggedIn(this.props.store)){
            redirectPage(this.props.history, nextURL)
            return
        }

        this.state={
            email:"",
            password:"",
            nextURL: nextURL
        }
    }

    handleCreateAccount = () => {
        redirectPage(this.props.history, '/signup')
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLoginForm = e => {
        e.preventDefault();
        this.props.store.loginUser({email: this.state.email, password: this.state.password})
    }

    handleGoogleLogin = (e) => {
        e.preventDefault()
        this.props.store.googleLogin()
    }

    render(){
        if(isUserLoggedIn(this.props.store)){
            return null
        }
        return(
            <div>
            <Form onSubmit={this.handleLoginForm}>
                <FormGroup><Label>Email</Label>
                <Input type='email' name='email' placeholder='abc@xyz.com' onChange={this.updateInput} />
                </FormGroup>
                <FormGroup><Label>Password</Label>
                <Input type='password' name='password' placeholder='Enter your password here.' onChange={this.updateInput}/>
                </FormGroup>
                <FormGroup>
                <Button type='submit'>Login</Button>
                </FormGroup>
            </Form>
            <p>------------------------------------OR---------------------------------</p>
            <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
            <Button color="danger" onClick={this.handleCreateAccount}>Create an account with us!</Button>
            </div>
        )
    }

}

export default withRouter(LoginComponent)