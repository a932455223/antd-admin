import React,{Component} from 'react'
import {Layout, Menu} from "antd"
import Header from "../../components/Header/Header"

const {Content} = Layout;

export default class Welcome extends Component{
  render(){
    return <Layout >
      <Header />
      <Layout>
        <Layout>
          <Content style={{display: 'flex'}}>
            Welcome !
          </Content>
        </Layout>
      </Layout>
    </Layout>
  }
}
