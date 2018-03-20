import React, { Component } from "react";
import { modelInstance } from "../data/DinnerModel";

class SummaryView extends Component {
  state = {
    includePreparationInstructions: false
  };

  render() {
    return (
      <div className="col-12">
        <button onClick={this.props.setToSearchView}>
          Go back and edit dinner
        </button>
        <br />
        <br />
        <h4>My Dinner: {modelInstance.getNumberOfGuests()} Guests</h4>
        <table>
          <tbody>
            <tr>
              <th>Image</th>
              <th width="20%">Dish Name</th>
              <th width="20%">Cost Per Serving (SEK)</th>
              {this.state.includePreparationInstructions && (
                <th>Preparation Instructions</th>
              )}
            </tr>
            {modelInstance.getFullMenu().map(menuItem => {
              return (
                <tr>
                  <td>
                    <img src={menuItem.image} style={{ maxWidth: "200px" }} />
                  </td>
                  <td>
                    <p>{menuItem.title}</p>
                    {this.state.includePreparationInstructions && (
                      <p>
                        <a href={menuItem.sourceUrl} target="_blank">
                          See description on original website
                        </a>
                      </p>
                    )}
                  </td>
                  <td>{menuItem.pricePerServing}</td>
                  {this.state.includePreparationInstructions && (
                    <td>{menuItem.instructions}</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <br />
        <h4>Total Cost (SEK): {modelInstance.getTotalMenuPrice()}</h4>
        <br />
        <button
          onClick={() =>
            this.setState({
              includePreparationInstructions: !this.state
                .includePreparationInstructions
            })
          }>
          Toggle Print View
        </button>
      </div>
    );
  }
}

export default SummaryView;
