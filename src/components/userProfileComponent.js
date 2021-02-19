import { Component } from 'react'
import { Label, Input, FormGroup } from 'reactstrap'

class UserProfile extends Component {

    /*constructor(props){
        super(props)
        //if(this.checkUserLogin(this.props.store.auth.user)) this.redirectPage()

        this.state = {
            displayName: this.props.store.auth.user.displayName,
            email: this.props.store.auth.user.email,
            phoneNumber: this.props.store.auth.user.phoneNumber,
            emailVerified: this.props.store.auth.user.emailVerified,
            homeAddress: {
                address: this.props.store.userProfile.address,
                city: this.props.store.userProfile.city,
                postalCode: this.props.store.userProfile.postalCode
            },
            birthDate: this.props.store.userProfile.birthDate,
            gender: this.props.store.userProfile.gender
        }
    }

    checkUserLogin = user => {

    }

    redirectPage = () => {
        this.props.history.push('/login?url=updateProfile')
    }*/

    render() {
        return(
            <div>
                <form onSubmit={this.handleForm}>
                    <div>
                        <div><Label>Name:</Label></div>
                        <div><Input type="text" name="displayName" value={this.state.displayName} onChange={this.updateInput} required/></div>
                        <div><Label>Email:</Label></div>
                        <div><Input type="email" name="email" value={this.state.displayName} readOnly/></div>
                        <div><Label>Cell / Home Number:</Label></div>
                        <div><Input type="tel" name="phoneNumber" onChange={this.updateInput} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/></div>
                        <FormGroup>
                            <div><Label>Resident Address</Label></div>
                            <div><Label>Address</Label></div>
                            <div><Input type="text" name="address" onChange={this.updateInput} value={this.state.homeAddress.address} required/></div>
                            <div><Label>City</Label></div>
                            <div><Input type="text" name="city" onChange={this.updateInput} value={this.state.homeAddress.city} required/></div>
                            <div><Label>Postal Code</Label></div>
                            <div><Input type="text" name="postalCode" onChange={this.updateInput} value={this.state.homeAddress.postalCode} required/></div>
                        </FormGroup>
                    </div>
                </form>
            </div>
        )
    }

}

export default UserProfile