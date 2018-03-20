import React, { Component } from "react";

// we are storing the input value in this.state.inputValue
// and when a user clicks the search button, we send that state to our parent

export default class DishSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
  }

  onSearchSubmit = () => {
    this.props.setSearchQuery(this.state.inputValue);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          name="q"
          placeholder="Enter search query"
          value={this.state.inputValue}
          onChange={evt => this.updateInputValue(evt)}
        />
        <button onClick={this.onSearchSubmit}>Search</button>
      </div>
    );
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
}
