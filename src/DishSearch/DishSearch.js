import React, { Component } from "react";
import DinnerAPI from "../api/DinnerAPI.js";

// we are storing the input value in this.state.searchQuery
// and when a user clicks the search button, we send that state to our parent

export default class DishSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      searchType: "all"
    };
  }

  onSearchSubmit = event => {
    event.preventDefault();

    let { searchQuery, searchType } = this.state;
    this.props.setSearchQuery(searchQuery, searchType);
  };

  renderTypes() {
    let types = new DinnerAPI().types();
    let response = [];

    for (var type in types) {
      if (types.hasOwnProperty(type)) {
        response.push(
          <option key={type} value={type}>
            {types[type]}
          </option>
        );
      }
    }

    return response;
  }

  render() {
    return (
      <div>
        <h3>Find a dish</h3>
        <form onSubmit={this.onSearchSubmit}>
          <input
            type="number"
            name="q"
            placeholder="Enter search query"
            value={this.state.searchQuery}
            onChange={evt => this.setState({ searchQuery: evt.target.value })}
          />
          <select
            onChange={evt => this.setState({ searchType: evt.target.value })}>
            {this.renderTypes()}
          </select>
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
}
