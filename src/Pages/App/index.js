import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout, Menu} from "antd";
//=======================================================
import Header from "../../components/Header/Header";
// import MenuList from '../MenuList/MenuList';
import SiderBar from "../../components/SliderBar";
//===========================================================
import "./App.less";
import "../../style/base.less";
import "../../style/iconfont.less";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;



class App extends Component {
  state = {

  };

  render() {
    return (
      <Layout >
        <Header />
        <Layout>
          <SiderBar/>
          <Layout>
            <Content style={{display: 'flex'}}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

function mapStateToProp(store) {
  return {
    layout: store.layout
  }
}

// export default Layout;
export default connect(mapStateToProp)(App);
