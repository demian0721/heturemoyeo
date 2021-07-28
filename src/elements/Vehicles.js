import React, { Component } from "react";
// import "../Signup.scss";
// import "../signupComponent/Vehicles.scss";

class Vehicles extends Component {
  render() {
    return (
      <div className="AgrInfoContainer">
        <p>{this.props.infoTitle}</p>
        <ol>
          <li>{this.props.first}</li>
          <li>{this.props.second}</li>
          <li>{this.props.third}</li>
          <li>{this.props.fourth}</li>
        </ol>
      </div>
    );
  }
}

export default Vehicles;