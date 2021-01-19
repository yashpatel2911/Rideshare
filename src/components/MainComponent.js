import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { loginUser, logoutUser, googleLogin, signupUser } from '../redux/ActionCreators';
=======
import { loginUser, logoutUser, googleLogin, signupUser, postFindRide } from '../redux/ActionCreators';
//import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FindRide from './FindRide';
>>>>>>> 5bd3857b894b4694fd4cba7c64443f5d41613734

const mapStateToProps = state => {
    return {
        auth: state.auth,
        rides: state.rides
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  googleLogin: () => dispatch(googleLogin()),
  
  postFindRide: (data) => dispatch(postFindRide(data))
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
          <FindRide rides={this.props.rides} postFindRide={this.props.postFindRide} />
          <Footer />
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
