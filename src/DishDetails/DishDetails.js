import React, { Component } from "react";
import { modelInstance } from "../data/DinnerModel";

class DishDetails extends Component {
  state = {
    numberOfGuests: modelInstance.getNumberOfGuests(),
    status: "INITIAL",
    dishDetails: null
  };

  syncNumberOfGuests() {
    this.setState({ numberOfGuests: modelInstance.getNumberOfGuests() });
  }

  componentWillMount = () => {
    modelInstance.addObserver(this.syncNumberOfGuests.bind(this));

    modelInstance
      .getDish(this.props.dish.id)
      .then(dishDetails => {
        this.setState({
          status: "LOADED",
          dishDetails
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  };

  componentWillUnmount() {
    modelInstance.removeObserver(this.syncNumberOfGuests.bind(this));
  }

  addToMenu() {
    modelInstance.addDishToMenu(this.props.dish.id);
  }

  renderDishDetails() {
    let {
      id,
      title,
      image,
      sourceUrl,
      instructions: preparationInstructions,
      extendedIngredients,
      pricePerServing
    } = this.state.dishDetails;

    return (
      <div
        className="DishDetails"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover"
        }}>
        <div className="DishDetailsOverlay">
          <h1>{title}</h1>
          <p>
            <a href={sourceUrl} target="_blank">
              See description on original website
            </a>
          </p>
          <button onClick={this.addToMenu.bind(this)}>Add to Menu</button>
          <button onClick={this.props.backToSearch}>Back to Search</button>
          <br />
          <br />
          <h4>Preparation</h4>
          <p>{preparationInstructions}</p>
          <br />
          <br />
          <h4>Ingredients for {this.state.numberOfGuests} people</h4>
          <table>
            <tbody>
              {extendedIngredients.map((ingredient, index) => {
                return (
                  <tr key={index}>
                    <th>{ingredient.name}</th>
                    <td>
                      {ingredient.amount * this.state.numberOfGuests}{" "}
                      {ingredient.unit}
                    </td>
                  </tr>
                );
              })}

              <tr>
                <td colSpan={2}>
                  <strong>Total Price Per Serving (SEK):</strong>
                  {pricePerServing}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.state.status === "INITIAL" && (
          <div className="alert alert-info" role="alert">
            Loading more details for <strong>{this.props.dish.title}</strong>
          </div>
        )}
        {this.state.status === "LOADED" && this.renderDishDetails()}
      </React.Fragment>
    );
  }
}

export default DishDetails;
