import React, { Component } from "react";
import "./Sidebar.css";
class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests()
    };
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    let value = e.target.value;
    let numberOfGuests = isNaN(+value) ? 0 : +value;

    this.props.model.setNumberOfGuests(numberOfGuests);
    this.setState({ numberOfGuests });
  };

  render() {
    return (
      <div className="Sidebar">
        <h3>This is the sidebar</h3>
        <p>
          People:
          <input
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
          <br />
          Total number of guests: {this.state.numberOfGuests}
        </p>
      </div>
    );
  }
}

export default Sidebar;
