import React, { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <div className="WelcomeScreen">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>

              <Link to="/search">
                <button className="btn btn-primary">Start Planning</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
