import { Component } from "react";
import { Label, Input, FormGroup, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import {
  getDateN,
  changedValues,
  isUserLoggedIn,
  getUserProfileState,
  redirectPage,
} from "../extraFunctionalities/extraFunctionalities";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    if (!isUserLoggedIn(this.props.store)) {
      this.redirectPage();
      return;
    }

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    this.setStateofComponent();
  }

  setStateofComponent = () => {
    if (isUserLoggedIn(this.props.store)) {
      this.initialState = getUserProfileState(
        this.props.store.userProfile.userProfile
      );

      this.setState({
        ...this.initialState,
        isLoading: false,
      });
    }
  };

  updateInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateLocation = (e) => {
    this.setState({
      ...this.state,
      homeAddress: {
        ...this.state.homeAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

  redirectPage = () => {
    let param = {
      "?url": "login",
      url: "updateProfile",
    };

    redirectPage(this.props.history, param);
  };

  handleForm = (e) => {
    e.preventDefault();

    var data = changedValues(this.initialState, this.state);

    if (Object.keys(data).length !== 0) {
      if (Object.keys(data.homeAddress).length === 0) {
        delete data.homeAddress;
      }

      let userDetails = {
        userUID: this.props.store.auth.user.uid,
        userProfile: data,
      };

      this.props.store.updateUserProfile(userDetails);
    } else {
      console.log("Your Data has been Updated Successfully.");
    }
  };

  render() {
    if (!isUserLoggedIn(this.props.store)) {
      this.redirectPage();
      return null;
    }
    return (
      <>
        {this.state.isLoading ? (
          <h1>Loading</h1>
        ) : (
          <div>
            <form onSubmit={this.handleForm}>
              <div>
                <div>
                  <Label>Name:</Label>
                </div>
                <div>
                  <Input
                    type="text"
                    name="displayName"
                    value={this.state.displayName}
                    onChange={this.updateInput}
                    minLength="3"
                    required
                  />
                </div>
                <div>
                  <Label>Email:</Label>
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    value={this.state.email}
                    readOnly
                  />
                </div>
                <div>
                  <Label>Cell / Home Number:</Label>
                </div>
                <div>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.updateInput}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    required
                  />
                </div>
                <FormGroup>
                  <div>
                    <Label>Resident Address</Label>
                  </div>
                  <div>
                    <Label>Address</Label>
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="address"
                      value={this.state.homeAddress.address}
                      onChange={this.updateLocation}
                      required
                    />
                  </div>
                  <div>
                    <Label>City</Label>
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="city"
                      value={this.state.homeAddress.city}
                      onChange={this.updateLocation}
                      required
                    />
                  </div>
                  <div>
                    <Label>Postal Code</Label>
                  </div>
                  <div>
                    <Input
                      type="text"
                      name="postalCode"
                      value={this.state.homeAddress.postalCode}
                      onChange={this.updateLocation}
                      maxLength="6"
                      minLength="6"
                      required
                    />
                  </div>
                </FormGroup>
                <div>
                  <Label>Date</Label>
                </div>
                <div>
                  <Input
                    type="date"
                    name="birthDate"
                    value={this.state.birthDate}
                    onChange={this.updateInput}
                    max={getDateN()}
                    required
                  />
                </div>
                <FormGroup>
                  <div>
                    <Label>Gender</Label>
                  </div>
                  <div>
                    <Input
                      type="select"
                      name="gender"
                      value={this.state.gender}
                      onChange={this.updateInput}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Not want to Disclose">
                        I don't want to disclose.
                      </option>
                    </Input>
                  </div>
                </FormGroup>
                <FormGroup>
                  <Button type="submit">Save</Button>
                </FormGroup>
              </div>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default withRouter(UserProfile);
