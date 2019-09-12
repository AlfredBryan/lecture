import React, { Component } from "react";
import "./Spinner.css";

class Spinner extends Component {
  render() {
    return (
      <div className="wrap">
        <div class="lds-dual-ring"></div>
      </div>
    );
  }
}

export default Spinner;
