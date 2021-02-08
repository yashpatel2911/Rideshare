import React, { Component } from 'react';
import Header from './HeaderComponent';
import RideRequest from './RideRequestForm'
import Footer from './FooterComponent';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser, googleLogin, signupUser, findRide, postRide, autoRide } from '../redux/ActionCreators';
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FindRide from './FindRide';
import PostRide from './PostRide';
import RideForms from './RideForms';


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
  
  render() {

    return (
      <div>
        <Header auth={this.props.auth} 
          signupUser={this.props.signupUser}
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser}
          googleLogin={this.props.googleLogin}
          /> 

        <RideForms/>  
          
          
        <Switch>
          <Route path="/findride" component={()=><FindRide rides={this.props.rides} findRide={this.props.findRide} />} />
          <Route path="/postride" component={()=><PostRide postRide={this.props.postRide}/>} />
          <Route path="/requestride" component={()=><RideRequest autoRide={this.props.autoRide} autoRideRequest={this.props.autoRideRequest}/>} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
