import React, {Component} from "react";
//======================================================
import ActionBar from "../component/ActionBar";
export default class Home extends Component {
  render() {
    return (
      <div>
        <ActionBar parent="branches"/>
        <h2> Organization branches </h2>
      </div>
    )

  }
}
