/**
 * 文件说明： 组织机构管理/组件/ 员工新建组件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import React, {Component} from "react";
import {Button, Card, Col, Form, Icon, Row,Radio,TreeSelect,DatePicker,Select,Input,message,Modal} from "antd";
import classNames from "classnames";
import axios from 'axios';
import qs from 'qs';
//========================================================================================================
import FormCreator from "../FormCreator";
import ajax from '../../../../tools/POSTF.js';
//========================================================================================
import "./less/staffDetail.less";
import API from '../../../../../API';
const RadioGroup = Radio.Group;
const Option = Select.Option;
const FormItem = Form.Item;



class BranchesDetail extends Component {
  state = {
    bankJobCategory: [],
    jobStatus: [],
    educationLevel: [],
    parentDepartmentDropDown: [],
    rolesDropDown:[],
    rolesHide:false,
    coloseIcon:false

  };

  componentWillMount(){
    axios.get(API.GET_COMMON_DROPDOWN('bankJobCategory'))
      .then(res => {
        this.setState({
          ...this.state,
          bankJobCategory: res.data.data
        })
      });

    axios.get(API.GET_COMMON_DROPDOWN('jobStatus'))
      .then(res => {
        this.setState({
          ...this.state,
          jobStatus: res.data.data
        })
      });

    axios.get(API.GET_STAFF_ADD_DEPARTMENT)
      .then( res => {
        this.setState({
          parentDepartmentDropDown: res.data.data
        })
        console.log(res.data.data,12121212)
      });

    axios.get(API.GET_COMMON_DROPDOWN('educationLevel'))
      .then(res => {
        this.setState({
          ...this.state,
          educationLevel: res.data.data
        })
      })

    ajax.Get(API.GET_STAFF_ADD_ROLES)
    .then((res)=>{
      this.setState({
        rolesDropDown:res.data.data
      })
    })
  }

  closeDock() {
    console.log('bye bye');
    // if(this.state.coloseIcon){
    //   let that = this;
    //   Modal.confirm({
    //     title: '您确定要离开吗?',
    //     content: '离开将会丢失您填写的内容',
    //     onOk() {
    //       that.setState({
    //         coloseIcon:false
    //       })
    //       that.props.closeDock();
    //     },
    //     onCancel() {
    //       console.log('Cancel');
    //     },
    //   });
    // }else{
    //   this.props.closeDock()
    // }
    this.props.closeDock()
    
  }
  onHandleChange = () => {
    this.setState({
       rolesHide:  !this.state.rolesHide,
       coloseIcon:true
    })
  }
  handleSubmit = (e) => {
    console.log(123)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = ((values) => {
          for(let key in values){
            if(typeof values[key] === 'object' && Object.keys(values[key]).includes('_d')){
              values[key] = values[key].format('YYYY-MM-DD');
            }else if(values[key] === undefined){
              delete values[key]
            }
          }
          console.log(values);
          return values;
        })(values);
        ajax.Post(API.POST_ADD_STAFF,data)
          .then( res => {
            console.log(res)
            console.log('MESSAGE',res.data.message);
            if(res.data.message === 'OK'){
              message.success('您已经创建成功！');
              this.props.closeDock();
              this.props.refresh()
            }else {
              Modal.error({content: res.data.message,})
            }
          })
          .catch( err => {
            console.log(err)
          })
      }
    });
  };
  inputChange = () => {
    this.setState({
      coloseIcon:true
    })
  }
  render() {
    console.log()
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
            <Radio value="75">男</Radio>
            <Radio value="76">女</Radio>
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
            id: 'true',
            name: '是'
          },
          {
            id: 'false',
            name: '否'
          }
        ]
      },
      {
        label: '所属角色',
        type: 'other',
        required: true,
        message: '请选择所属角色！',
        formItemLayout: formItemLayout,
        field: 'roles',
        render: (
          <Select
            mode="multiple"
            getPopupContainer={ () => document.getElementById('newstaffroles')}
          >
            {
              this.state.rolesDropDown && this.state.rolesDropDown.map(item => {
                return <Option value={item.id.toString()} key={item.id.toString()}>{item.roleName}</Option>
              })
            }
          </Select>
        )
      }
    ];

//。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
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
      value: "1",
      key: "1",
      children: [{
        label: 'Child Node1',
        value: "2",
        key: "2",
      }],
    }, {
      label: 'Node2',
      value: "3",
      key: "3",
      children: [{
        label: 'Child Node3',
        value: "4",
        key: "4",
      }, {
        label: 'Child Node4',
        value: "5",
        key: "5",
      }, {
        label: 'Child Node5',
        value: "6",
        key: "6",
        children: [{
          label: 'Child Node1',
          value: "7",
          key: "7",
        }],
      }],
    }];

//
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
          <Select
            mode="multiple"
          >
            {
              this.state.parentDepartmentDropDown.map( item => {
                return <Option value={item.id.toString()} key={item.id.toString() + item.name}>{item.name}</Option>
              })
            }
          </Select>
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
      <Form id="newstaffroles" className="newstaffroles">
        <div className={classNames('dock-container', 'staffDetail')} id="staffDetail">
          <div className="dock-title">
            <Row>
              <Col span={22}>
               
                <strong style={{marginLeft:"10px"}}>新增员工</strong>
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
          </div>
          <Card>
            <div className="staff-form">
              <Row>
                <Col span={9} className="avatar-wrapper">
                  <Icon type="user-add" className="avatar"/>
                </Col>
                <Col span={15}>
                  <FormItem
                    label={<span>姓名</span>}
                    {...formItemLayoutS}
                    key='name'
                  >
                    {getFieldDecorator('name', {
                      rules: [{required: true, message: '请填写姓名!'}],
                      onChange:this.inputChange
                      // initialValue: '请填写姓名'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>身份证</span>}
                    {...formItemLayoutS}
                    key='certificate'
                  >
                    {getFieldDecorator('certificate', {
                      rules: [{required: false, message: '请填身写份证'}],
                      onChange:this.inputChange
                      // initialValue: '请填身写份证'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>性别</span>}
                    {...formItemLayoutS}
                    key="gender"
                  >
                    {getFieldDecorator("gender", {
                      rules: [{required:false, message: "请选择性别"}],
                      onChange:this.inputChange
                      // initialValue: "请选择性别"
                    })(
                      <Select
                        getPopupContainer={
                          () => document.getElementById('staffDetail')
                        }
                      >
                        {[
                            {
                              id: '75',
                              name: '男'
                            },
                            {
                              id: '76',
                              name: '女'
                            }
                          ].map((option, index) => {
                          return <Option value={option.id.toString()} key={option.id.toString()}>{option.name}</Option>
                        })}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>出生日期</span>}
                    {...formItemLayoutS}
                    key="birth"
                  >
                    {getFieldDecorator('birth', {
                      rules: [{required:false, message: '请填写出生日期'}],
                      onChange:this.inputChange
                      // initialValue: '出生日期'
                    })(
                      <DatePicker getCalendarContainer={ () => document.getElementById('staffDetail')}/>
                    )}
                  </FormItem>

                </Col>
              </Row>


              <Row className="form-group">
                <Col span={9}>
                  <h1>基本信息</h1>
                </Col>
               <Col span={15}>
                 <FormItem
                    label={<span>手机</span>}
                    {...formItemLayoutS}
                    key='phone'
                  >
                    {getFieldDecorator('phone', {
                      rules: [{required: true, message: '请填写手机号!'}],
                      onChange:this.inputChange
                      // initialValue: '请填写手机号'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>微信号</span>}
                    {...formItemLayoutS}
                    key='wechat'
                  >
                    {getFieldDecorator('wechat', {
                      rules: [{required: false, message: '请填写微信号!'}],
                      onChange:this.inputChange
                      // initialValue: '请填写微信号'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>邮箱</span>}
                    {...formItemLayoutS}
                    key='email'
                  >
                    {getFieldDecorator('email', {
                      rules: [{required: false, message: '请填写邮箱!'}],
                      onChange:this.inputChange
                      // initialValue: '请填写邮箱'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>家庭住址</span>}
                    {...formItemLayoutS}
                    key='address'
                  >
                    {getFieldDecorator('address', {
                      rules: [{required: false, message: '请填写住址!'}],
                      onChange:this.inputChange
                      // initialValue: '请填写住址'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>添加用户</span>}
                    {...formItemLayoutS}
                    key='isUser'
                  >
                    {getFieldDecorator('isUser', {
                      rules: [{required: true, message: '请选择是否添加用户!'}],
                      onChange:this.onHandleChange
                    })(
                      <RadioGroup >
                        <Radio value="true">是</Radio>
                        <Radio value="false">否</Radio>
                      </RadioGroup>
                    )}
                  </FormItem>
                   <FormItem
                    label={<span>所属角色</span>}
                    {...formItemLayoutS}
                    key='roles'
                    style={{display : this.state.rolesHide ? "block" : "none" }}
                  >
                    {getFieldDecorator('roles', {
                      rules: [{required: true, message: '请选择所属角色'}],
                      onChange:this.inputChange
                    })(
                       <Select
                          mode="multiple"
                          getPopupContainer={ () => document.getElementById('newstaffroles')}
                        >
                          {
                            this.state.rolesDropDown && this.state.rolesDropDown.map(item => {
                              return <Option value={item.id.toString()} key={item.id.toString()}>{item.roleName}</Option>
                            })
                          }
                        </Select>
                    )}
                  </FormItem>
               </Col>
              </Row>



              <Row className="form-group">
                <div>
                  <h1>工作信息</h1>
                </div>
                <div>
                  <FormItem
                    label={<span>工号</span>}
                    {...formItemLayoutS}
                    key='code'
                  >
                    {getFieldDecorator('code', {
                      rules: [{required: true, message: '请填写工号!'}],
                      onChange:this.inputChange
                      // initialValue: '请填写工号'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>目前职位</span>}
                    {...formItemLayoutS}
                    key='position'
                  >
                    {getFieldDecorator('position', {
                      rules: [{required: true, message: '请选择目前职位'}],
                      onChange:this.inputChange
                      // initialValue: ''
                    })(
                      <Select
                        getPopupContainer={
                          () => document.getElementById('newstaffroles')
                        }
                      >
                        {this.state.bankJobCategory && this.state.bankJobCategory.map((option, index) => {
                          return <Option value={option.id.toString()} key={'position' + index}>{option.name}</Option>
                        })}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>任职状态</span>}
                    {...formItemLayoutS}
                    key='jobStatus'
                  >
                    {getFieldDecorator('jobStatus', {
                      rules: [{required: false, message: '请选择任职状态'}],
                      onChange:this.inputChange
                      // initialValue: ''
                    })(
                      <Select
                        getPopupContainer={
                          () => document.getElementById('newstaffroles')
                        }
                      >
                        {this.state.jobStatus && this.state.jobStatus.map((option, index) => {
                          return <Option value={option.id.toString()} key={'jobStatus' + index}>{option.name}</Option>
                        })}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>所属机构</span>}
                    {...formItemLayoutS}
                    key='departments'
                  >
                    {getFieldDecorator('departments', {
                      rules: [{required: true, message: '请选择所属机构'}],
                      onChange:this.inputChange
                      // initialValue: ''
                    })(
                       <Select
                          mode="multiple"
                          getPopupContainer={ () => document.getElementById('newstaffroles')}
                        >
                          {
                            this.state.parentDepartmentDropDown && this.state.parentDepartmentDropDown.map(item => {
                              return <Option value={item.id.toString()} key={item.id.toString()}>{item.name}</Option>
                            })
                          }
                        </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>入职时间</span>}
                    {...formItemLayoutS}
                    key="inductionTime"
                  >
                    {getFieldDecorator('inductionTime', {
                      rules: [{required:true, message: '请填写入职时间'}],
                      onChange:this.inputChange
                      // initialValue: ''
                    })(
                      <DatePicker getCalendarContainer={ () => document.getElementById('staffDetail')}/>
                    )}
                  </FormItem>
                </div>
              </Row>

              <Row className="form-group">
                <div>
                  <h1>教育经历</h1>
                </div>
                <div>
                  <FormItem
                    label={<span>学历</span>}
                    {...formItemLayoutS}
                    key='educationLevel'
                  >
                    {getFieldDecorator('educationLevel', {
                      rules: [{required: false, message: '请选择学历'}],
                      onChange:this.inputChange
                      // initialValue: ''
                    })(
                      <Select
                        getPopupContainer={
                          () => document.getElementById('staffDetail')
                        }
                      >
                        {this.state.educationLevel && this.state.educationLevel.map((option, index) => {
                          return <Option value={option.id.toString()} key={'position' + index}>{option.name}</Option>
                        })}
                      </Select>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>毕业院校</span>}
                    {...formItemLayoutS}
                    key='school'
                  >
                    {getFieldDecorator('school', {
                      rules: [{required: false, message: '请填写毕业院校!',min:1,max:100}],
                      onChange:this.inputChange
                      // initialValue: '请填写毕业院校'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>专业</span>}
                    {...formItemLayoutS}
                    key='major'
                  >
                    {getFieldDecorator('major', {
                      rules: [{required: false, message: '请填写专业!',min:1,max:100}],
                      onChange:this.inputChange
                      // initialValue: '请填写专业'
                    })(
                      <Input/>
                    )}
                  </FormItem>
                  <FormItem
                    label={<span>毕业时间</span>}
                    {...formItemLayoutS}
                    key="graduationTime"
                  >
                    {getFieldDecorator('graduationTime', {
                      rules: [{required:false, message: '请填写毕业时间'}],
                      onChange:this.inputChange
                      // initialValue: ''
                    })(
                      <DatePicker getCalendarContainer={ () => document.getElementById('staffDetail')}/>
                    )}
                  </FormItem>
                </div>
              </Row>
              <Row className="submit-controller">
                <Button htmlType="submit" className="save"  onClick={this.handleSubmit}>提交</Button>
              </Row>
            </div>
          </Card>
        </div>
      </Form>
    )
  }
}


export default Form.create()(BranchesDetail)


