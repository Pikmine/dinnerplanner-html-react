import React, { Component } from "react";
import "./SelectDish.css";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import DishSearch from "../DishSearch/DishSearch.js";

class SelectDish extends Component {
  state = {
    searchQuery: ""
  };

  setSearchQuery = query => {
    this.setState({
      searchQuery: query
    });
  };

  render() {
    return (
      <div className="SelectDish">
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-3">
              <Sidebar model={this.props.model} />
            </div>
            <div className="col-9">
              {/* Added a new component for search */}
              <DishSearch setSearchQuery={this.setSearchQuery} />

              {/* Send searchQuery to the Dishes component */}
              <Dishes searchQuery={this.state.searchQuery} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
