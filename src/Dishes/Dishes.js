import React, { Component } from "react";
import DishDetails from "../DishDetails/DishDetails";
import DishSearch from "../DishSearch/DishSearch.js";
import "./Dishes.css";
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import { modelInstance } from "../data/DinnerModel";

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "INITIAL"
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount = () => {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes(this.props.searchType, this.props.searchQuery)
      .then(results => {
        this.setState({
          status: "LOADED",
          dishes: results
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  };

  render() {
    let shouldRenderDishes = dishes => dishes.length > 0;
    let renderDishes = dishes =>
      dishes.map(dish => (
        <div key={dish.id} className="col-sm-12 col-md-6 col-lg-3">
          <div className="card">
            <img
              className="card-img-top"
              src={`https://spoonacular.com/recipeImages/${dish.image}`}
              style={{ maxWidth: "100px" }}
              alt={dish.title}
            />
            <div className="card-body">
              <h5 className="card-title">{dish.title}</h5>
              <a
                onClick={() =>
                  this.setState({ status: "DISH_SELECTED", selectedDish: dish })
                }
                className="btn btn-primary">
                More Details
              </a>
            </div>
          </div>
        </div>
      ));

    let { status, dishes, selectedDish } = this.state;

    return (
      <div className="Dishes">
        {status !== "DISH_SELECTED" && (
          <React.Fragment>
            <DishSearch setSearchQuery={this.props.setSearchQuery} />
            <br />
          </React.Fragment>
        )}
        {status === "INITIAL" && (
          <div className="alert alert-info" role="alert">
            Loading search results ...
          </div>
        )}
        {status === "ERROR" && (
          <div className="alert alert-danger" role="alert">
            An unexpected error occurred. Check the console log for details.
          </div>
        )}
        {status === "LOADED" &&
          !shouldRenderDishes(dishes) && (
            <div className="alert alert-danger" role="alert">
              0 search results were found
            </div>
          )}
        {status === "LOADED" &&
          shouldRenderDishes(dishes) && (
            <div className="row">{renderDishes(dishes)}</div>
          )}
        {status === "DISH_SELECTED" && (
          <DishDetails
            dish={selectedDish}
            backToSearch={() => this.setState({ status: "LOADED" })}
          />
        )}
      </div>
    );
  }
}

export default Dishes;
