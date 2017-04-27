/**
 * 文件说明： 组织机构管理/组件/ 员工新建组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React, {Component} from "react";
import {Button, Card, Col, Form, Icon, Row,Radio,TreeSelect,DatePicker} from "antd";
import classNames from "classnames";
import axios from 'axios';
import qs from 'qs';
//========================================================================================================
import FormCreator from "../FormCreator";
//========================================================================================
import "./less/staffDetail.less";
import API from '../../../../../API';
const RadioGroup = Radio.Group;

class BranchesDetail extends Component {
  state = {
    bankJobCategory: [],
    jobStatus: [],
    educationLevel: []
  };

  componentWillMount(){
    axios.get(API.GET_DROPDOWN('bankJobCategory'))
      .then(res => {
        this.setState({
          ...this.state,
          bankJobCategory: res.data.data
        })
      });

    axios.get(API.GET_DROPDOWN('jobStatus'))
      .then(res => {
        this.setState({
          ...this.state,
          jobStatus: res.data.data
        })
      });

    axios.get(API.GET_DROPDOWN('educationLevel'))
      .then(res => {
        this.setState({
          ...this.state,
          educationLevel: res.data.data
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
            if(typeof values[key] === 'object' && Object.keys(values[key]).includes('_d')){
              values[key] = values[key].toString();
            }
          }
          return values;
        })(values);
        console.log(data);
        // axios.post(API.POST_ADD_STAFF,qs.stringify(data),{
        axios.post('/api/staff',qs.stringify(data))
          .then( res => {
            console.log(res)
          })
          .catch( err => {
            console.log(err)
          })
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayoutS = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 10
      }
    };


    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 12
      }
    };

// 基础信息
     const baseDataForForm = [
      {
        label: '姓名',
        type: 'input',
        required: true,
        message: '请填写姓名！',
        formItemLayout: formItemLayoutS,
        field: 'name',
      },
      {
        label: '身份证号',
        type: 'input',
        required: true,
        message: '请填写身份证！',
        formItemLayout: formItemLayoutS,
        field: 'certificate'
      },
      {
        label: '性别',
        type: 'other',
        required: false,
        message: '请选择性别！',
        formItemLayout: formItemLayoutS,
        field: 'gender',
        render: (
          <RadioGroup >
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </RadioGroup>
        )
      },
      {
        label: '出生日期',
        type: 'datePicker',
        required: false,
        message: '请选择出生日期！',
        formItemLayout: formItemLayoutS,
        field: 'birth'
      },
    ];


// 联系方式
     const connectDataForForm = [
      {
        label: '手机',
        type: 'input',
        required: true,
        message: '请填写手机号码！',
        formItemLayout: formItemLayout,
        field: 'phone'
      },
      {
        label: '微信号',
        type: 'input',
        required: false,
        message: '请填写微信号！',
        formItemLayout: formItemLayout,
        field: 'wechat'
      },
      {
        label: '邮箱',
        type: 'input',
        required: false,
        message: '请填写邮箱！',
        formItemLayout: formItemLayout,
        field: 'email'
      },
      {
        label: '家庭地址',
        type: 'input',
        required: false,
        message: '请填写家庭地址！',
        formItemLayout: formItemLayout,
        field: 'address'
      },
      {
        label: '添加用户',
        type: 'select',
        required: true,
        message: '请选择是否添加用户！',
        formItemLayout: formItemLayout,
        field: 'isUser',
        options: [
          {
            id: true,
            name: '是'
          },
          {
            id: false,
            name: '否'
          }
        ]
      }
    ];


     const eductionDataForForm = [
      {
        label: '学历',
        type: 'select',
        required: false,
        message: '请选择学历！',
        formItemLayout: formItemLayout,
        field: 'educationLevel',
        options: this.state.educationLevel
      },
      {
        label: '毕业院校',
        type: 'input',
        required: false,
        message: '请填写毕业院校！',
        formItemLayout: formItemLayout,
        field: 'school'
      },
      {
        label: '专业',
        type: 'input',
        required: false,
        message: '请填写专业！',
        formItemLayout: formItemLayout,
        field: 'major'
      },
      {
        label: '毕业时间',
        type: 'datePicker',
        required: false,
        message: '请填写毕业时间！',
        formItemLayout: formItemLayout,
        field: 'graduationTime'
      },
    ];


    const treeData = [{
      label: '山西湖光总行',
      value: 1,
      key: 1,
      children: [{
        label: 'Child Node1',
        value: 2,
        key: 2,
      }],
    }, {
      label: 'Node2',
      value: 3,
      key: 3,
      children: [{
        label: 'Child Node3',
        value: 4,
        key: 4,
      }, {
        label: 'Child Node4',
        value: 5,
        key: 5,
      }, {
        label: 'Child Node5',
        value: 6,
        key: 6,
        children: [{
          label: 'Child Node1',
          value: 7,
          key: 7,
        }],
      }],
    }];

     const wordDataForForm = [
      {
        label: '工号',
        type: 'input',
        required: true,
        message: '请输入工号！',
        formItemLayout: formItemLayout,
        field: 'code'
      },
      {
        label: '目前职位',
        type: 'select',
        required: true,
        message: '请选择职位！',
        formItemLayout: formItemLayout,
        field: 'position',
        options: this.state.bankJobCategory
      },
      {
        label: '任职状态',
        type: 'select',
        required: false,
        message: '请选择任职状态！',
        formItemLayout: formItemLayout,
        field: 'jobStatus',
        options: this.state.jobStatus
      },
      {
        label: '所属机构',
        type: 'other',
        required: true,
        message: '请选择所属机构！',
        formItemLayout: formItemLayout,
        field: 'departments',
        render: (
          <TreeSelect
            getPopupContainer = { () => document.getElementById('staffDetail')}
            treeData={treeData}
            multiple={true}
          />
        )
      },
      {
        label: '入职时间',
        type: 'datePicker',
        required: true,
        message: '请选择入职时间',
        formItemLayout: formItemLayout,
        field: 'inductionTime',
      }
    ];




    return (
      <Form onSubmit={this.handleSubmit.bind(this)}>
        <div className={classNames('dock-container', 'staffDetail')} id="staffDetail">
          <div className="dock-title">
            <Row>
              <Col span={22}>
                <i className="iconfont">&#xe696;</i>
                <strong>新增员工</strong>
              </Col>
              <Col span={2}>
            <span
              className="close"
              onClick={this.closeDock.bind(this)}
            >
              &times;
            </span>
              </Col>
            </Row>
          </div>
          <Card>
            <div className="staff-form">
              <Row>
                <Col span={9} className="avatar-wrapper">
                  <Icon type="user-add" className="avatar"/>
                </Col>
                <Col span={15}>
                  <FormCreator
                    items={baseDataForForm}
                    getFieldDecorator={getFieldDecorator}
                    containerID="staffDetail"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <div>
                  <h1>基本信息</h1>
                </div>
               <div>
                 <FormCreator
                   items={connectDataForForm}
                   getFieldDecorator={getFieldDecorator}
                   containerID="staffDetail"
                 />
               </div>
              </Row>
              <Row className="form-group">
                <div>
                  <h1>工作信息</h1>
                </div>
                <div>
                  <FormCreator
                    items={wordDataForForm}
                    getFieldDecorator={getFieldDecorator}
                    containerID="staffDetail"
                  />
                </div>
              </Row>
              <Row className="form-group">
                <div>
                  <h1>教育经历</h1>
                </div>
                <div>
                  <FormCreator
                    items={eductionDataForForm}
                    getFieldDecorator={getFieldDecorator}
                    containerID="staffDetail"
                  />
                </div>
              </Row>
              <Row className="submit-controller">
                <Button htmlType="submit" className="save">提交</Button>
              </Row>
            </div>
          </Card>
        </div>
      </Form>
    )
  }
}


export default Form.create()(BranchesDetail)


