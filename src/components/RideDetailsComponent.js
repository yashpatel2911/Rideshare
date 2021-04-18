import { Component } from "react";
import { withRouter } from "react-router-dom";
import queryString from "querystring";
import { firestore } from "../firebase/firebase";

class RideDetails extends Component {
  constructor(props) {
    super(props);

    let rideID = queryString.parse(this.props.location.search)["?rideID"];

    this.state = {
      src: "",
      dst: "",
      msg: "",
      rideID: rideID,
    };
  }

  componentDidMount() {
    firestore
      .collection("rides")
      .doc(this.state.rideID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          firestore
            .collection("rides")
            .doc(this.state.rideID)
            .collection("comments")
            .get()
            .then((snapshot) => {
              snapshot.forEach((document) => {
                this.setState({
                  src: doc.data().src,
                  dst: doc.data().dst,
                  msg: document.data().message,
                });
              });
            });
        }
      });
  }

  render() {
    return (
      <>
        <h1>{this.state.rideID}</h1>
        <h2>src:{this.state.src}</h2>
        <h2>dst:{this.state.dst}</h2>
        <h2>message: {this.state.msg}</h2>
        <input type="text" />
        <button type="submit">Comment</button>
      </>
    );
  }
}

export default withRouter(RideDetails);
