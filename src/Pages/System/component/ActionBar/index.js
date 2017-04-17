/**
 * Created by jufei on 2017/4/17.
 */
import React,{Component} from 'react';
import {Card,Row,Col,Button,Input} from 'antd';


export default class ActionBar extends Component{
  render(){
    return(
      <Card>
        <Row>
          <Col span="2">
            <Button>筛选</Button>
          </Col>
          <Col span="8">
            <Input type="text" placeholder="查询"/>
          </Col>
          <Col span="11">
          </Col>
          <Col span="1">
            <Button>新建</Button>
          </Col>
        </Row>
      </Card>
    )
  }
}
