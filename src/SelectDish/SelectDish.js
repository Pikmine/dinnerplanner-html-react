import React, { Component } from "react";
import "./SelectDish.css";
import Sidebar from "../Sidebar/Sidebar";
import Dishes from "../Dishes/Dishes";
import SummaryView from "../SummaryView/SummaryView";

class SelectDish extends Component {
  state = {
    status: "SELECT",
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
      <React.Fragment>
        {this.state.status === "SELECT" && (
          <div className="SelectDish">
            <div className="container-fluid">
              <div className="row justify-content-md-center">
                <div className="col-md-3 col-sm-12">
                  <Sidebar
                    model={this.props.model}
                    setToSummaryView={() =>
                      this.setState({ status: "SUMMARY" })
                    }
                  />
                </div>
                <div className="col-md-9 col-sm-12">
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
        )}
        {this.state.status === "SUMMARY" && (
          <div className="SummaryView">
            <div className="container-fluid">
              <div className="row justify-content-md-center">
                <SummaryView
                  setToSearchView={() => {
                    this.setState({ status: "SELECT" });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default SelectDish;
