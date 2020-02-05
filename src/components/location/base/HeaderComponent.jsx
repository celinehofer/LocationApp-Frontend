import React, {Component} from 'react';
import {Link} from "react-router-dom";
import AuthenticationService from './../auth/AuthenticationService.js';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log(isUserLoggedIn);
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/welcome" className="navbar-brand">Locations over all</a></div>
                    <ul className="navbar-nav">
                        {isUserLoggedIn && (<li className="nav-link" to="/welcome"><Link to="/welcome">Home</Link></li>)}  
                        {isUserLoggedIn && (<li className="nav-link" to="/locations"><Link to="/locations">Locations</Link></li>)}
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li className="nav-link"><Link to="/login">Login</Link></li>}
                        {isUserLoggedIn && <li className="nav-link"><Link to="/login" onClick={AuthenticationService.logout}>Logout</Link></li>}
                    </ul>
                </nav>
            </header>

        );
    }
}

export default HeaderComponent;