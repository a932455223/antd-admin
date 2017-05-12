/**
 * 文件说明： 组织机构管理/组件/ 组织机构新建组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Button, Card, Col, Form, Input, Row, Select} from "antd";
import classNames from 'classnames'
import axios from 'axios';
import {connect} from "react-redux";
import ajax from '../../../../tools/POSTF.js';
//=================================================
import "./less/branchesEditor.less";
import API from '../../../../../API';
import BranchBaseInfo from './Forms/BranchBaseInfo'


const FormItem = Form.Item;
const Option = Select.Option;


class BranchesEditor extends Component {

  state = {
    changed: false,
    categoryDropdown: [],
    parentDepartmentDropDown: [],
    province:[],
    city:[],
    area:[],
    branchInfo: false
  };

  componentWillMount(){
    ajax.Get(API.GET_ADD_DEPARTMENT_CATEGORIES)
      .then(res => {
        this.setState({
          categoryDropdown: res.data.data
        })
      })

    this.getDepartmnent(this.props.id)
  }

  componentDidMount(){
    // this.getDepartmnent()
  }

  componentWillReceiveProps(nextProps){
    if(this.props.id !==nextProps.id){
      this.getDepartmnent(nextProps.id);
    }
  }

  getDepartmnent = (id) => {
    axios.get(API.GET_DEPARTMENT_DETAIL(id))
      .then( res => {
        console.log(res);
        let branchBase = res.data.data;
        let arry = branchBase.regionCode ? branchBase.regionCode.split(' '):[]
        let addressDetail = branchBase.adress ? branchBase.adress.split(' ')[3]:''
        this.setState({
          branchInfo:{
            name:{
              value:branchBase.name
            },
            category:{
              value:branchBase.category.id ? branchBase.category.id.toString() : undefined
            },
            parentOrg:{
              value:branchBase.parentOrg.id ? branchBase.parentOrg.id.toString() : undefined
            },
            director:{
              value:branchBase.director
            },
            phone:{
              value:branchBase.phone
            },
            adress:{
              value:branchBase.adress
            },
            province:{
              value:arry[0]
            },
            city:{
              value:arry[1]
            },
            area:{
              value:arry[2]
            },
            addressDetail:{
              value:addressDetail
            }
          }
        })
      })
  }


  closeDock() {
    console.log('bye bye');
    this.props.closeDock()
  }

  hasChange(){
    this.setState({
      changed: true
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        for(let k in values){
          if(values[k] === undefined || values[k] === null){
            delete values[k]
          }
        }
        console.log('Received values of form: ', values);
        ajax.Put(API.PUT_DEPARTMENT(this.props.id),values)
          .then( res => {
            alert(res.data.message);
            if(res.data.message === 'OK'){
              this.props.refresh()
            }
          })
      }
    });
  };

  render() {
    const branchInfo = this.state.branchInfo;
    // const departmentInfo = this.state.department;

    return (
        <div
          className={classNames('dock-container','departmentEditor')}
          id="departmentEditor"
          onKeyDown={this.hasChange.bind(this)}
          ref={ departmentEditor => this.departmentEditor = departmentEditor}
        >


          <BranchBaseInfo branchInfo= {branchInfo} id={this.props.id} getDepartments={this.props.getDepartments} closeDock={this.props.closeDock}/>
          {/*业务信息*/}
          <Card className="business" title={<h3>业务信息</h3>}>
            <Row>
              <Col span={4}>
                客户规模：
              </Col>
              <Col span={20}>
                {this.state.branchInfo.customerCount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                存款规模：
              </Col>
              <Col span={20}>
                ￥{this.state.branchInfo.depositCount}
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                贷款规模：
              </Col>
              <Col span={20}>
                ￥{this.state.branchInfo.loanCount}
              </Col>
            </Row>
          </Card>


          {/*操作日志*/}
          <Card className="business" title={<h3>查看日志</h3>}>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={10}>
                查看任务
              </Col>
              <Col span={10}>
                time
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={10}>
                查看任务
              </Col>
              <Col span={10}>
                time
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                王五
              </Col>
              <Col span={10}>
                查看任务
              </Col>
              <Col span={10}>
                time
              </Col>
            </Row>
          </Card>
        </div>
    )
  }

}


export default connect()(BranchesEditor)
