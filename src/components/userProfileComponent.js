import { Component } from 'react'
import { Label, Input, FormGroup, Button } from 'reactstrap'
import { todayDate, firebaseTimeStampToDate, changedValues } from '../extraFunctionalities/extraFunctionalities'

class UserProfile extends Component {

    constructor(props){
        super(props)

        //if(this.checkUserLogin(this.props.store.auth.user)) this.redirectPage()
        //const user = this.props.store.auth.user
        let userProfile = this.props.store.userProfile.userProfile
        
        this.initialState = {
            displayName: userProfile.displayName ? userProfile.displayName : "",
            email: userProfile.email,
            phoneNumber: userProfile.phoneNumber ? userProfile.phoneNumber : "",
            homeAddress: 
                userProfile.homeAddress ? 
                {
                address: userProfile.homeAddress.address ? userProfile.homeAddress.address : "",
                city: userProfile.homeAddress.city ? userProfile.homeAddress.city : "",
                postalCode: userProfile.homeAddress.postalCode ? userProfile.homeAddress.postalCode : ""
                }
                : 
                {address: "", city: "", postalCode: ""},
            birthDate: userProfile.birthDate ? firebaseTimeStampToDate(userProfile.birthDate) : "2000-01-01",
            gender: userProfile.gender ? userProfile.gender : "Not want to disclose"
        }

        this.state = this.initialState
    } 

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateLocation = e => {
        this.setState({
            ...this.state,
            homeAddress: {
                ...this.state.homeAddress,
                [e.target.name]: e.target.value
            }
        })
    }

    checkUserLogin = user => {
    }

    redirectPage = () => {
        this.props.history.push('/login?url=updateProfile')
    }

    

    handleForm = e => {
        e.preventDefault()

        var data = changedValues(this.initialState, this.state)

        if(Object.keys(data).length !== 0){
            if(Object.keys(data.homeAddress).length === 0){delete data.homeAddress}
            
            let userDetails = {
                userUID: this.props.store.auth.user.uid,
                userProfile: data
            }

            this.props.store.updateUserProfile(userDetails)
        }

        else{
            console.log("Your Data has been Updated Successfully.")
        }

    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleForm}>
                    <div>
                        <div><Label>Name:</Label></div>
                        <div><Input type="text" name="displayName" value={this.state.displayName} onChange={this.updateInput} minLength="3" required/></div>
                        <div><Label>Email:</Label></div>
                        <div><Input type="email" name="email" value={this.state.email} readOnly/></div>
                        <div><Label>Cell / Home Number:</Label></div>
                        <div><Input type="tel" name="phoneNumber" value={this.state.phoneNumber} onChange={this.updateInput} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/></div>
                        <FormGroup>
                            <div><Label>Resident Address</Label></div>
                            <div><Label>Address</Label></div>
                            <div><Input type="text" name="address" value={this.state.homeAddress.address} onChange={this.updateLocation} required/></div>
                            <div><Label>City</Label></div>
                            <div><Input type="text" name="city" value={this.state.homeAddress.city} onChange={this.updateLocation} required/></div>
                            <div><Label>Postal Code</Label></div>
                            <div><Input type="text" name="postalCode" value={this.state.homeAddress.postalCode} onChange={this.updateLocation} maxLength="6" minLength="6" required/></div>
                        </FormGroup>
                        <div><Label>Date</Label></div>
                        <div><Input type="date" name="birthDate" value={this.state.birthDate} onChange={this.updateInput} max={todayDate()} required/></div>
                        <FormGroup>
                            <div><Label>Gender</Label></div>
                            <div>
                                <Input type="select" name="gender" value={this.state.gender} onChange={this.updateInput}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not want to Disclose">I don't want to disclose.</option>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Save</Button>
                        </FormGroup>
                    </div>
                </form>
            </div>
        )
    }

}

export default UserProfile