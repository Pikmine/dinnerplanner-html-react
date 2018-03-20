import React, { Component } from "react";
import "./Sidebar.css";
import { modelInstance } from "../data/DinnerModel";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: modelInstance.getFullMenu()
    };
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    let value = e.target.value;
    let numberOfGuests = isNaN(+value) ? 0 : +value;

    this.props.model.setNumberOfGuests(numberOfGuests);
    this.setState({ numberOfGuests });
  };

  syncMenu() {
    this.setState({ menu: modelInstance.getFullMenu() });
  }

  componentWillMount = () => {
    modelInstance.addObserver(this.syncMenu.bind(this));
  };

  componentWillUnmount() {
    modelInstance.removeObserver(this.syncMenu.bind(this));
  }

  render() {
    return (
      <div className="Sidebar">
        <h3>My Dinner</h3>
        <p>
          Guests:{" "}
          <input
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
        </p>
        <br />
        <h4>My Menu</h4>
        <table>
          <tbody>
            <tr>
              <th>Dish Name</th>
              <th>Cost (in SEK)</th>
            </tr>
            {modelInstance.getFullMenu().length === 0 && (
              <tr>
                <td colSpan={2}>
                  <i>No items in your menu</i>
                </td>
              </tr>
            )}
            {modelInstance.getFullMenu().length > 0 &&
              modelInstance.getFullMenu().map(({ title, pricePerServing }) => {
                return (
                  <tr>
                    <td>{title}</td>
                    <td>{pricePerServing}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <br />
        <table>
          <tbody>
            <tr>
              <th>Total Price (in SEK)</th>
              <td>{modelInstance.getTotalMenuPrice()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Sidebar;
