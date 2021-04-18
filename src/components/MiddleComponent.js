import { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { Jumbotron } from "reactstrap";
import Ride from "./RenderRide";
import FindRide from "./FindRide";
import PostRide from "./PostRide";
import RideForms from "./RideForms";
import RideRequest from "./RideRequestForm";

export default class MiddleComponent extends Component {
  findRideStore = () => {
    const store = {
      rides: this.props.store.rides,
      findRide: this.props.store.findRide,
    };
    return store;
  };

  postRideStore = () => {
    const store = {
      auth: this.props.store.auth,
      userProfile: this.props.store.userProfile,
      postRide: this.props.store.postRide,
    };
    return store;
  };

  rideRequestStore = () => {
    const store = {
      autoRide: this.props.store.autoRide,
      autoRideRequest: this.props.store.autoRideRequest,
    };
    return store;
  };

  render() {
    return (
      <div>
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
        <RideForms />
        <Switch>
          <Route
            path="/findride"
            component={() => <FindRide store={this.findRideStore()} />}
          />
          <Route
            path="/postride"
            component={() => <PostRide store={this.postRideStore()} />}
          />
          <Route
            path="/requestride"
            component={() => <RideRequest store={this.rideRequestStore()} />}
          />
        </Switch>
        <div>
          <br />
          <br />
        </div>
      </div>
    );
  }
}
