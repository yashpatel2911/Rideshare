import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isLoginModelOpen: false,
            isSignupModelOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleLoginModal = this.toggleLoginModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.toggleSignupModal = this.toggleSignupModal.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleLoginModal() {
        this.setState({
            isLoginModelOpen: !this.state.isLoginModelOpen
        });
    }

    toggleSignupModal() {
        this.setState({
            isSignupModelOpen: !this.state.isSignupModelOpen
        });
    }

    handleLogin(event) {
        this.toggleLoginModal();
        this.props.loginUser({email: this.email.value, password: this.password.value});
        event.preventDefault();

    }

    handleSignup(event) {
        this.toggleSignupModal();
        this.props.signupUser({email: this.email.value, password: this.password.value});
        event.preventDefault();

    }

    handleGoogleLogin(event) {
        this.toggleLoginModal();
        this.props.googleLogin();
        event.preventDefault();
    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return(
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto navbar-text" href="/">
                            <img src="/rideshare.png" height="60" width="100" className="navbartext"
                                alt="Rideshare" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem className="mr-2">
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="navbartext"> About Us </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="mr-2">
                                    <NavLink className="nav-link " to="/contactus">
                                        <span className="navbartext"> Contact Us </span>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="mr-2">
                                    { !this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleLoginModal}>
                                            <span className="fa fa-sign-in fa-lg "> Login </span>
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        <div className="navbar-text mr-3">{this.props.auth.user.displayName}</div>
                                        <Button outline onClick={this.handleLogout}>
                                            <span className="fa fa-sign-out fa-lg"></span> Logout
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        </div>
                                    }

                                </NavItem>
                                <NavItem>
                                    { !this.props.auth.isAuthenticated ?
                                        <Button outline onClick={this.toggleSignupModal}>
                                            <span className="fa fa-sign-up fa-lg "> SignUp </span>
                                            {this.props.auth.isFetching ?
                                                <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                : null
                                            }
                                        </Button>
                                        :
                                        <div>
                                        </div>
                                    }

                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Find Your Cheapest Ride Here!</h1>
                                <p>We provide rideshare for intercity as well as intracity</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isLoginModelOpen} toggle={this.toggleLoginModal}>
                    <ModalHeader toggle={this.toggleLoginModal}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Login</Button>
                        </Form>
                        <p></p>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Login with Google</Button>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isSignupModelOpen} toggle={this.toggleSignupModal}>
                    <ModalHeader toggle={this.toggleSignupModal}>SignUp</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSignup}>
                            <FormGroup>
                                <Label htmlFor="email">Email</Label>
                                <Input type="text" id="email" name="email"
                                    innerRef={(input) => this.email = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    innerRef={(input) => this.password = input}  />
                            </FormGroup>
                            
                            <Button type="submit" value="submit" color="primary">SignUp</Button>
                        </Form>
                        <p></p>
                        <Button color="danger" onClick={this.handleGoogleLogin}><span className="fa fa-google fa-lg"></span> Signup with Google</Button>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Header;