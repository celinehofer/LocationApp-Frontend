import React, { Component } from 'react';
import { Link } from "react-router-dom";
class WelcomeComponent extends Component {

    render() {
        return (
            <>

                <div className="container" mt-5>
                    <h1>Welcome!</h1>
                    Tell about your favorites places to be.
                </div>
            </>
        );
    }
}

export default WelcomeComponent;