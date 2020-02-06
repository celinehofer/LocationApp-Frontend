import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './auth/AuthenticatedRoute.jsx';
import LoginComponent from "./auth/LoginComponent.jsx";
import LocationListComponent from './LocationListComponent.jsx';
import ErrorComponent from './base/ErrorComponent.jsx';
import HeaderComponent from './base/HeaderComponent.jsx';
import FooterComponent from './base/FooterComponent.jsx';
import WelcomeComponent from './base/WelcomeComponent.jsx';
import LocationComponent from './LocationComponent.jsx';

class LocationApp extends Component {
    render() {
        return (
            <div className="LocationApp">
                <Router>
                    <HeaderComponent/>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/login" component={LoginComponent} />
                        <AuthenticatedRoute path="/welcome/" component={WelcomeComponent} />
                        <AuthenticatedRoute path="/locations/:id" component={LocationComponent} />
                        <AuthenticatedRoute path="/locations" component={LocationListComponent} />
                        <Route component={ErrorComponent} />
                    </Switch>
                    <FooterComponent/>
                </Router>
            </div>
        );
    }
}

export default LocationApp;