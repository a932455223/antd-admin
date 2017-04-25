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
import '../../style/base.less'

 class App extends Component{
    render(){
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
