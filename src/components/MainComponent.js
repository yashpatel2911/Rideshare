import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser, logoutUser, googleLogin, signupUser } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (creds) => dispatch(loginUser(creds)),
  signupUser: (creds) => dispatch(signupUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  googleLogin: () => dispatch(googleLogin()),
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
          <Footer />
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
