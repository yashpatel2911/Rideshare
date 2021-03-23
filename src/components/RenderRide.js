import React from 'react';
import { Card, Button,CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import {FaUser , FaCarAlt} from 'react-icons/fa'
import {BiTimeFive} from 'react-icons/bi'
import {ImLocation} from 'react-icons/im'

class RenderRide extends React.Component{

    constructor(props) {
        super(props)

        this.state={
            ride: this.props.ride
        }
    }

    componentDidMount() {
        this.props.ride.userRef.get().then(
            snap => {
                this.setState({userData: snap.data()})
            }
        )

        console.log(this.state.userData)
        
    }

    handleBook = (e, rideID) => {
        e.preventDefault()
        this.props.history.push("")
    }

    render() {
    function RenderRide({ ride }) {
       
        return(
            
            <Card>
                <CardBody>
                    <CardText style={{color:'blue', fontWeight:'bold'}}>{}</CardText>
                    <CardText style={{color:'blue', fontWeight:'bold'}}>{this.state.ride.src} to {this.state.ride.dst}</CardText>
                    
                    <CardText style={{fontWeight:'bold'}}> Leaving: {this.state.ride.rideDate} at {this.state.ride.rideTime}</CardText>
                    <CardText style={{fontWeight:'bold'}}> Returning: {this.state.ride.rideDate} at {this.state.ride.rideTime}</CardText>

                    <br/>

                    <CardText style={{color:'GrayText'}}> Pickup: {this.state.ride.src}</CardText>
                    <CardText style={{color:'GrayText'}}> Dropoff: {this.state.ride.dst}</CardText>
                    <Button type="submit" onClick={(e) => {handleBook(e, this.props.history, this.state.ride._id)}}>Book</Button>
                    <CardText style={{color:'blue', fontWeight:'bold'}}><FaUser size={"1.25em"} /> {ride.userName}</CardText>
                    <CardText style={{color:'blue', fontWeight:'bold'}}><FaCarAlt size={"1.25em"} /> {ride.src} to {ride.dst}</CardText>
                    
                    <CardText style={{fontWeight:'bold'}}> <BiTimeFive size={"1.25em"} /> Leaving: {ride.rideDate} at {ride.rideTime}</CardText>
                    <CardText style={{fontWeight:'bold'}}> <BiTimeFive size={"1.25em"} /> Returning: {ride.rideDate} at {ride.rideTime}</CardText>

                    <br/>

                    <CardText style={{color:'GrayText'}}> <ImLocation size={"1.25em"} /> Pickup: {ride.src}</CardText>
                    <CardText style={{color:'GrayText'}}> <ImLocation size={"1.25em"} /> Dropoff: {ride.dst}</CardText>
                    <Button type="submit" onClick={(e) => {handleSubmit(e, ride._id)}}>Book</Button>
                </CardBody>
            </Card>
        )
    }
}

const handleBook = (e, history, rideID) => {
    e.preventDefault()
    history.push("/rideDetails?rideID="+rideID)
}

    const Ride = (props) => {
        const ride = props.rides.rides.map((ride) => {
            return (
                
                <div key={ride._id} className="col-12 ">
                    <RenderRide ride={ride} history={props.history}/>
                    <hr style={{width:'15%', margin:'20px 0px 20px 0px'}} />
                </div>
                
            );
        });

        if (props.rides.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        {/*<Loading />*/}
                    </div>
                </div>
            );
        }
        else if (props.rides.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.rides.errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <h1>Available Rides</h1>  
                    </div>
                    <hr style={{width:'15%', margin:'50px 0px 50px 0px'}} />
                    <div className='row'>
                        {ride}
                    </div>
                </div>
            );
    }

export default withRouter(Ride);