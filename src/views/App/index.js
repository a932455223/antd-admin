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
 class App extends Component{
     
    render(){
        return (
            <Layout className={styles.layout}>
              <Header />
              <Layout className={styles.main}>
                <SiderBar/>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <NavPath/>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                        {this.props.children}
                    </Content>
              </Layout>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
              Antd demo ©2017 Created by Yeapoo Front-end
            </Footer>
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
