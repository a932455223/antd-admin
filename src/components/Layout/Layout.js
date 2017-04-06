/**
 * 文件说明： 布局组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const {Content, Footer, Sider } = Layout;
import Header from '../Header/Header';
import styles from'./layout.scss';



import './layout.less'


class Home extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <Layout className={styles.layout}>
        <Header />

        <Layout className={styles.main}>
            {this.props.children}
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
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



export default connect(mapStateToProp)(Home);
