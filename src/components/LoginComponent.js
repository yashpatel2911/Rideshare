import { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  isUserLoggedIn,
  redirectPage,
} from "../extraFunctionalities/extraFunctionalities";
import queryString from "querystring";
import { Form, FormGroup, Label, Button, Input } from "reactstrap";

class LoginComponent extends Component {
  constructor(props) {
    super(props);

    let params = queryString.parse(this.props.location.search);

    if (isUserLoggedIn(this.props.store)) {
      redirectPage(this.props.history, params);
      return;
    }

    this.state = {
      email: "",
      password: "",
      params: params,
    };
    console.log(this.state);
  }

  handleCreateAccount = () => {
    let params = {
      ...this.state.params,
      "?url": "signup",
      url: this.state.params["?url"],
    };
    console.log(params);

    redirectPage(this.props.history, params);
  };

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLoginForm = (e) => {
    e.preventDefault();

    let creds = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.store.loginUser(creds);
  };

  handleGoogleLogin = (e) => {
    e.preventDefault();
    this.props.store.googleLogin();
  };

  render() {
    if (isUserLoggedIn(this.props.store)) {
      return null;
    }
    return (
      <div>
        <Form onSubmit={this.handleLoginForm}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="abc@xyz.com"
              onChange={this.updateInput}
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter your password here."
              onChange={this.updateInput}
            />
          </FormGroup>
          <FormGroup>
            <Button type="submit">Login</Button>
          </FormGroup>
        </Form>
        <p>
          ------------------------------------OR---------------------------------
        </p>
        <Button color="danger" onClick={this.handleGoogleLogin}>
          <span className="fa fa-google fa-lg"></span> Login with Google
        </Button>
        <Button color="danger" onClick={this.handleCreateAccount}>
          Create an account with us!
        </Button>
      </div>
    );
  }
}

export default withRouter(LoginComponent);
