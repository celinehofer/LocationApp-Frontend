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
            message: null
        };
    //    this.state = {
    //         locations: [
    //             {id: 1, title: "Bern", description: 'nice city with bears', targetDate: new Date()},
    //             {id: 2, title: "Galway", description: 'best place to live ', targetDate: new Date()},
    //             {id: 3, title: "Amsterdam", description: 'whatever you can do there', targetDate: new Date()}
    //         ]
    //     }

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
        });
    }

    deleteLocationClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        LocationDataService.deleteLocation(username, id).then(response => {
            this.setState({ message: `Delete of location ${id} Successful` });
            this.refreshLocations();
        });
    }
 
    addLocationClicked() {
        this.props.history.push(`/locations/-1`);
    }

    updateLocationClicked(id) {
        console.log("update " + id);
        this.props.history.push(`/locations/${id}`);
    }

        
    render() {
        console.log("render");
        return (
            <div>
                <h1>List of Locations</h1>
                {this.state.message && (<div class="alert alert-success">{this.state.message}</div>
                )}
                <div className="container">
                    <table className="table">
                    <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.locations.map(
                                location => (
                                    <tr key={location.id}>
                                        <td>{location.description}</td>
                                        <td>{moment(location.targetDate).format("YYYY-MM-DD")}</td>
                                        <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(location.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(location.id)}>Delete</button></td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div>
                        <button className="btn btn-success" onClick={this.addLocationClicked}>Add new Location</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default LocationListComponent;