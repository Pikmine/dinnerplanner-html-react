import React, { Component } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div className="WelcomeScreen_Image">
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-6">
              <div className="WelcomeScreen_Button">
                <Link to="/search">
                  <button className="btn btn-primary">Start Planning</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;
