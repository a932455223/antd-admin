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
import API from '../../../API';
import ajax from '../../tools/POSTF.js';

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;



class App extends Component {
  state = {
    // permissions: {
    //   'customerManage:base:view': true
    // }
  };

  componentWillMount(){

  }

  render() {
    const permissions = this.state.permissions;
    return (
      <Layout >
        <Header permissions={permissions}/>
        <Layout>
          <SiderBar permissions={permissions} />
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
