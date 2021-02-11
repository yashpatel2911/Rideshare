import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem, CardBody, CardText } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

    function RenderRide({ ride }) {
        return(
            <Card>
                <CardBody>
                    <CardTitle>Available Ride</CardTitle>
                    <CardText>{ride.src}</CardText>
                    <CardText>{ride.dst}</CardText>
                    <CardText>{ride.rideTime}</CardText>
                    <CardText>{ride.rideDate}</CardText>
                </CardBody>
            </Card>
        );
    }

    const Ride = (props) => {

        const ride = props.rides.rides.map((ride) => {
            return (
                <div key={ride._id} className="col-12 col-md-5 m-1">
                    <RenderRide ride={ride} />
                </div>
            );
        });

        if (props.rides.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
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
                        {ride}
                    </div>
                </div>
            );
    }

export default Ride;