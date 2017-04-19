import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;
import Header from '../../components/Header/Header';
// import MenuList from '../MenuList/MenuList';
import styles from'./index.scss'
import SiderBar from '../../components/SliderBar'
import NavPath from '../../components/NavPath/NavPath'
import './App.less'

 class App extends Component{
    render(){
        return (
            <Layout >
              <Header />
              <Layout>
                <SiderBar/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                      Antd demo ©2017 Created by Yeapoo Front-end
                    </Footer>
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
