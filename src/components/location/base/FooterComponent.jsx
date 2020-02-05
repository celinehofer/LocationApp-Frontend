import React, { Component } from "react";

class FooterComponent extends Component {
    render() {
        return (
            <div>
                <footer className="page-footer font-small bg-dark text-white fixed-bottom">
                    <div className="footer-copyright text-center py-3">© 2020 Copyright:
                      <a href="https://github.com/celinehofer"> Céline Hofer</a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;