import React,{Component} from 'react';
import {Card,Row,Col,Button,Input} from 'antd';


export default class LimitCard extends Component{

  saveHandle(id = this.props.id){
    this.props.saveClick(id)
  }


  render(){
    return (
      <div>
        <Row>
          <Col span={20}>
            权限管理
          </Col>
          <Col span={4}>
            <Button onClick={(id = this.props.id) => {
              this.props.saveClick(id)
            }}>保存</Button>
          </Col>
        </Row>
        <h4>{this.props.id}</h4>
      </div>
    )
  }
}
