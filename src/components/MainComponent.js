import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser, googleLogin, signupUser, findRide, postRide, autoRide } from '../redux/ActionCreators';
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import UserProfile from './userProfileComponent'
import MiddleComponent from './MiddleComponent';
import LoginComponent from './LoginComponent';


const mapStateToProps = state => {
    return {
        auth: state.auth,
        rides: state.rides,
        autoRide: state.autoRide
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  googleLogin: () => dispatch(googleLogin()),
  
  findRide: (data) => dispatch(findRide(data)),
  postRide: (data) => dispatch(postRide(data)),
  autoRideRequest: (data) => dispatch(autoRide(data))
});


class Main extends Component {

  componentDidMount() {
    
  }

  componentWillUnmount() {
    this.props.logoutUser();
  }

  returnHeaderStore = () => {
    const store = {
      auth: this.props.auth, 
      signupUser: this.props.signupUser,
      loginUser: this.props.loginUser,
      logoutUser: this.props.logoutUser,
      googleLogin: this.props.googleLogin, 
    }

    return store
  }

  returnMiddleStore = () => {
    const store = {
      rides: this.props.rides,
      findRide: this.props.findRide,
      postRide: this.props.postRide,
      autoRide: this.props.autoRide,
      autoRideRequest: this.props.autoRideRequest
    }

    return store
  }

  returnUserStore = () => {
    const store = {
      auth: this.props.auth
    }
    
    return store
  }
  
  render() {

    return (
      <div>
        <Header store={this.returnHeaderStore()}/>

        <Switch>
        <Route exact path="/updateProfile" component={()=><UserProfile store={this.returnUserStore()}/>} />
        <Route exact path="/login" component={()=><LoginComponent store={this.returnUserStore()}/> } />
        <Route path="/" component={()=><MiddleComponent store={this.returnMiddleStore()}/>} />
        </Switch>
        
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
