import React, { Component } from "react";
import "./SelectDish.css";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";

class SelectDish extends Component {
  state = {
    searchQuery: "",
    searchType: "all"
  };

  setSearchQuery = (searchQuery, searchType) => {
    this.setState({
      searchQuery,
      searchType
    });
  };

  render() {
    let { searchQuery, searchType } = this.state;

    return (
      <div className="SelectDish">
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-md-3 col-sm-12">
              <Sidebar model={this.props.model} />
            </div>
            <div className="col-md-9 col-sm-12">
              {/* Send searchQuery to the Dishes component */}
              <Dishes
                key={`results-${searchQuery}-${searchType}`}
                setSearchQuery={this.setSearchQuery}
                searchQuery={searchQuery}
                searchType={searchType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectDish;
