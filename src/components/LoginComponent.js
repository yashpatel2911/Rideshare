import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { checkUserlogin } from '../extraFunctionalities/extraFunctionalities'
import queryString from 'querystring'

class LoginComponent extends Component{

    constructor(props){
        super(props)

        let params = queryString.parse(this.props.location.search)
        
        if(!checkUserlogin(this.props.store.auth.user)){
            this.redirectPage(params['?url'])
            return
        }

        this.state={
            email:"",
            password:""
        }
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
    }

    render(){
        if(!checkUserlogin(this.props.store.auth.user)){
            return null
        }

        return(
            <form onSubmit={this.handleLoginForm}>
                <label for='username'>
                    Username
                </label>
                <input type='email' name='email' placeholder='abc@xyz.com'/>
                <label for='password'>
                    Password
                </label>
                <input type='password' name='password' placeholder='Enter your password here.'/>
                <button type='submit'>Login</button>
            </form>
        )
    }

}

export default withRouter(LoginComponent)