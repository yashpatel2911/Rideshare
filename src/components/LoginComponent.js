import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { isObjectNull } from '../extraFunctionalities/extraFunctionalities'
import queryString from 'querystring'
import { Form, FormGroup, Label, Button, Input } from 'reactstrap'

class LoginComponent extends Component{

    constructor(props){
        super(props)

        let nextURL = queryString.parse(this.props.location.search)['?url']

        if(this.checkUserLogin()){
            this.redirectPage(nextURL)
            return
        }

        this.state={
            email:"",
            password:"",
            nextURL: nextURL
        }
    }

    checkUserLogin = () => {
        return !isObjectNull(this.props.store.auth.user) && !isObjectNull(this.props.store.userProfile.userProfile)
    }

    redirectPage = (path = "/") => {
        this.props.history.push(path)
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
        if(this.checkUserLogin()){
            return null
        }
        return(
            <Form onSubmit={this.handleLoginForm}>
                <FormGroup><Label>Email</Label>
                <Input type='email' name='email' placeholder='abc@xyz.com' onChange={this.updateInput} />
                </FormGroup>
                <FormGroup><Label>Password</Label>
                <Input type='password' name='password' placeholder='Enter your password here.' onChange={this.updateInput}/>
                </FormGroup>
                <FormGroup>
                <Button type='submit'>Login</Button>
                <p>------------------------------------OR---------------------------------</p>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                </FormGroup>
            </Form>
        )
    }

}

export default withRouter(LoginComponent)