import React, {Component} from "react";
import {Layout} from "antd";
import Header from "../../components/Header/Header";
import "./less/welcome.less";

const {Content} = Layout;

export default class Welcome extends Component {
  render() {
    return (
      <Layout >
        <Header />
        <Layout>
          <Layout>
            <Content style={{display: 'flex'}}>
              <Layout className="welcomebg">
                <Layout className="logoyeapoo"></Layout>
              </Layout>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
