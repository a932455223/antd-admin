/**
 * Created by jufei on 2017/4/22.
 */
import React, {Component} from "react";
import {
 Icon
} from "antd";

import "./less/indexStyle.less";

export default class ImportCustomers extends Component {

  state = {};

  componentWillMount() {}

  saveEditInfo = () => {
    this.props.closeDock();
  }

  render() {
    return (
      <div className="importCustomers" id="importCustomers">
        <header className="title">
          <p>导入客户</p>
          <Icon
            className="close"
            onClick={this.saveEditInfo}
            type="close"
          />
        </header>
      </div>
    )
  }
}
