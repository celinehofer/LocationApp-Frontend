import React, { Component } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
import AuthenticationService from '../auth/AuthenticationService.js';

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
        this.state = {
            welcomeMessage: ""
        };
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this)
        this.handleError = this.handleError.bind(this);
    }

    render() {
        return (
            <>
                <h1>Hellöle tu mai peitsch</h1>
                <div className="container">
                    Welcome {this.props.match.params.name}. Tell about your favorites places to be {" "} <Link to="/locations">here</Link>.
                </div>
                <div className="container">
                    Click here to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage}
                        className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">{this.state.welcomeMessage}</div>
            </>
        );
    }

    retrieveWelcomeMessage() {
       
        AuthenticationService.executeJwtAuthenticationService(this.props.match.params.name)
            .then(response => this.handleSuccessfulResponse(response))
            .catch(error => this.handleError(error));
    }

    handleSuccessfulResponse(response) {
        console.log(response);
        this.setState({ welcomeMessage: response.data.message });
    }

    handleError(error) {
        console.log(error.response);
        let errorMessage = "";

        if (error.message)
            errorMessage += error.message;

        if (error.response && error.response.data) {
            errorMessage += error.response.data.message;
        }

        this.setState({ welcomeMessage: errorMessage });
    }
}

export default WelcomeComponent;