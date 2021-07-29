import React, { Component } from "react";
import "../Signup.scss";
import "../Vehicles.scss";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };
    this.toggleBox = this.toggleBox.bind(this);
  }

  toggleBox() {
    const { opened } = this.state;
    this.setState({
      opened: !opened,
    });
  }

  render() {
    var { title, children } = this.props;
    const { opened } = this.state;

    return (
      <div
        className={
          this.state.opened ? "Toggle clickedToggle" : "Toggle hideToggle"
        }
      >
        {" "}
        <div className="moreTextBox">
          <button className="moreBtn" onClick={this.toggleBox}>
            <span className="moreTitle">자세히보기</span>
            <i className="fas fa-angle-down"></i>
            {opened && <div>{children}</div>}
          </button>
        </div>
      </div>
    );
  }
}

export default Toggle;