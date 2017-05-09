/**
 * 文件说明： 组织机构管理/组件/ 组织机构编辑组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

import React, {Component} from "react";
import {Button, Card, Col, Form, Row, Select,Icon} from "antd";
import classNames from "classnames";
//=========================================================================
import FormCreator from "../FormCreator";
import AreaSelect from '../../../../components/AreaSelect';
//=================================================
import "./less/branchesDetail.less";
import {addDepartmentForForm} from "./formConf.js";
import API from "../../../../../API";
import ajax from "../../../../tools/POSTF.js";

const FormItem = Form.Item;
const Option = Select.Option;


class BranchesDetail extends Component {
  state = {
    categoryDropdown: [],
    parentDepartmentDropDown: []
  };

  componentWillMount() {
    ajax.Get(API.GET_ADD_DEPARTMENT_CATEGORIES)
      .then(res => {
        this.setState({
          categoryDropdown: res.data.data
        })
      })
  }

  closeDock() {
    console.log('bye bye');
    this.props.closeDock()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = ((values) => {
          for(let key in values){
           if(values[key] === undefined){
              delete values[key]
            }
          }
          return values;
        })(values);

        let province = document.getElementsByClassName('area-select-province')[0].getElementsByClassName('ant-select-selection-selected-value')[0].title;
        let city = document.getElementsByClassName('area-select-city')[0].getElementsByClassName('ant-select-selection-selected-value')[0].title;
        let county = document.getElementsByClassName('area-select-county')[0].getElementsByClassName('ant-select-selection-selected-value')[0].title;
        let detailAddress = document.getElementById('fullAddress').value;

        data.address = `${province} ${city} ${county} ${detailAddress}`;
        console.log('Received values of form: ', data);
        ajax.Post(API.POST_DEPARTMENT,data)
          .then( res => {
            if(res.data.message === "OK"){
              alert('新建成功');
              this.props.refresh();
              this.props.closeDock();
            }else {
              alert(res.data.message)
            }
          })
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 12
      }
    };


    const addDepartmentForForm = [
      {
        label: '机构名称',
        type: 'input',
        required: true,
        message: '请填写组织机构名称！',
        formItemLayout: formItemLayout,
        field: 'name',
      },
      {
        label: '负责人',
        type: 'input',
        required: true,
        message: '请填写组织负责人！',
        formItemLayout: formItemLayout,
        field: 'director',
      },
      {
        label: '组织类别',
        type: 'other',
        required: true,
        message: '请选择组织类别！',
        formItemLayout: formItemLayout,
        field: 'category',
        render: (
          <Select
            onSelect={(value) => {
              ajax.Get(API.GET_ADD_DEPARTMENT_PARENT, {
                level: value
              }).then(res => {
                this.setState({
                  parentDepartmentDropDown: res.data.data
                })
              })
            }}
          >
            {
              this.state.categoryDropdown && this.state.categoryDropdown.map((option, index) => {
                return <Option value={option.id.toString()} key={ option.id + option.name}>{option.name}</Option>
              })
            }
          </Select>
        )
      },
      {
        label: '所属组织',
        type: 'other',
        required: false,
        message: '请选择所属组织！',
        formItemLayout: formItemLayout,
        field: 'parentDepartment',
        render: (
          <Select>
            {
              this.state.parentDepartmentDropDown && this.state.parentDepartmentDropDown.map(item => {
                return <Option value={item.id.toString()} key={item.name + item.id}>{item.name}</Option>
              })
            }
          </Select>
        )
      },
      {
        label: '组织地址',
        type: 'other',
        required: true,
        message: '组织地址！',
        formItemLayout: formItemLayout,
        field: 'address',
        initialValue: {
          province: 2,
          city: 52,
          county: 500,
        },
        render: (
          <AreaSelect/>
        )
      },
      {
        label: '详细地址',
        type: 'input',
        required: true,
        message: '请填写详细地址',
        formItemLayout: formItemLayout,
        field: 'fullAddress',
      },
      {
        label: '联系电话',
        type: 'input',
        required: false,
        message: '请填写组织联系电话！',
        formItemLayout: formItemLayout,
        field: 'phone',
      },
      {
        label: '备注信息',
        type: 'textarea',
        required: false,
        message: '请填写备注',
        formItemLayout: formItemLayout,
        field: 'remark',
      },
    ];

    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)}
      className= "branchesformbox">
        <div
          className={classNames('dock-container', 'departmentDetail')}
          id="branchesDetail"
        >
          <Row className="dock-title">
            <Col span={22}>
              {this.props.id === -1 ? '添加组织机构' : '编辑'}
            </Col>
            <Col span={2}>
            <Icon
              className="close"
              onClick={this.closeDock.bind(this)}
              type="close"
              style={{cursor:"pointer"}}
            />
            </Col>
          </Row>
          <Card
          >
            <div className="branches-form">
              {/*form*/}
              <FormCreator
                getFieldDecorator={getFieldDecorator}
                items={addDepartmentForForm}
                containerID="branchesDetail"
              />
              <div>
                <Button className="save" htmlType="submit" >保存</Button>
              </div>
            </div>
          </Card>
        </div>
      </Form>
    )
  }

}


export default Form.create()(BranchesDetail)
