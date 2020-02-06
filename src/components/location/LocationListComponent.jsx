import React, { Component } from 'react';
import AuthenticationService from './auth/AuthenticationService.js';
import LocationDataService from './LocationDataService.js';
import moment from 'moment'

class LocationListComponent extends Component {
    constructor(props) {
        console.log("constructor");
        super(props)
        this.state = {
            locations: [],
        };

        this.deleteLocationClicked = this.deleteLocationClicked.bind(this);
        this.updateLocationClicked = this.updateLocationClicked.bind(this);
        this.addLocationClicked = this.addLocationClicked.bind(this);
        this.refreshLocations = this.refreshLocations.bind(this);
    }

    componentWillUnmount() {
        console.log("componentDidUnmount");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate");
        console.log(nextProps);
        console.log(nextState);
        return true;
    }

    componentDidMount() {
        console.log("componentDidMount");
        this.refreshLocations();
        console.log(this.state);
    }

    refreshLocations() {
        let username = AuthenticationService.getLoggedInUserName();
        LocationDataService.retrieveAllLocations(username).then(response => {
            this.setState({ locations: response.data });
        }).catch(response => {
            console.log('refresh failed')
        })
    }

    deleteLocationClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        LocationDataService.deleteLocation(username, id).then(response => {
            this.setState({ message: `Delete of location ${id} Successful` });
            this.refreshLocations();
        }).catch(response => {
            console.log("delete failed")
        })
    }

    addLocationClicked() {
        this.props.history.push(`/locations/-1`);
    }

    updateLocationClicked(id) {
       this.props.history.push(`/locations/${id}`);
    }


    render() {
        return (
            <div className="locationList m-3">
                <h2 className="title">List of Locations</h2>
                <button className="btn btn-success" onClick={this.addLocationClicked}>Add new Location</button>
                {this.state.message && (<div class="alert alert-success">{this.state.message}</div>
                )}
                <table>                     
                    <tbody className="card">
                        {this.state.locations.map(location => (
                            <div className="card header" key={location.id}>
                                <img className="card-img-top" src="slieveLeague.jpg" align="center"/>
                                <div className="card-body vertical">
                                    <div><h2 className="card-title mb-2">{location.title}</h2></div>
                                <div className="padding-text"><p className="card-text-padding">{location.description}</p></div>

                                <div className="bottom-card">
                                    <div className="card-text mb-2 date">{moment(location.targetDate).format("YYYY-MM-DD")} - {location.username}</div>
                                     </div>
                                    <div className="btn-align">
                                        <span><button className="btn btn-success btn-lg" onClick={() => this.updateLocationClicked(location.id)}>Update</button></span>
                                        <span><button className="btn btn-danger btn-lg" onClick={() => this.deleteLocationClicked(location.id)}>Delete</button></span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LocationListComponent;