import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  Icon,
  Input,
  Form,
  Select
} from 'antd';
import _ from 'lodash';
import axios from 'axios';
import styles from './indexStyle.less';
import api from './../../../../API';
import { connect } from 'react-redux';
const FormItem = Form.Item;
const Option = Select.Option;


/*const AddNew = () => (
  <div className={styles.addNew}>
    <Icon type="plus" />
    <p>新建家庭关系</p>
  </div>
)*/

// 具体的添加内容
/*class addContentForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <FormItem labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="关系">
          {getFieldDecorator('relationship', {})(
            <Select placeholder="请选择关系类型">
              <Option value="marriage">夫妻</Option>
              <Option value="fraternity">兄弟</Option>
              <Option value="parent">父母</Option>
            </Select>
          )}
        </FormItem>

        <FormItem labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="联系方式">
          {getFieldDecorator('contactMethod', {})(
            <Input placeholder='请输入手机号' />
          )}
        </FormItem>

        <FormItem labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="身份证号">
          {getFieldDecorator('idCard', {})(
            <Input placeholder='请输入身份证号' />
          )}
        </FormItem>

        <FormItem labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          label="工作属性">
          {getFieldDecorator('functionalAttributes', {})(
            <Select placeholder="请选择工作属性">
              <Option value="worker">上班族</Option>
              <Option value="retired">退休</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    )
  }
}*/

// const addContent = Form.create()(addContentForm);

export class AddContentForm extends Component{

  // static propTypes={
  //   addData:{
  //     "certificate": " ",
  //     "id": "",
  //     "jobCategory": "",
  //     "name": "",
  //     "phone": "",
  //     "relation": ""
  //   }
  // }

  state={
    isAdd:false,
  }

  //增加按钮和表单切换
  toggleAdd = () => {
    this.setState({
      isAdd:!this.state.isAdd
    });
  }
  componentWillReceiveProps(){
    this.setState({
      // length
      // addData:this.props.parentState.finance[length-1]
    })
    console.log("listttt",this.props.relation);
  }
  render(){
    if(this.state.isAdd){
      return(
        //card新增表单
        <Card
          className="family-card family-card-modify"
          title={
            <div className="my-card-title">
              <Input
                prefix={<i className="iconfont icon-customer1"></i>}
                type="text"
                ref='name'
                placeholder='项目名称'
              />
              <span
                className="cancel-btn"
                onClick={()=>{this.toggleAdd()}}
              >
                取消
              </span>
              <span
                className="save-btn"
                onClick={()=>{this.toggleAdd()}}
              >
                保存
              </span>
            </div>
          }
        >
              <Row>
                <Col span={8}>
                  <span>业务机构：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" ref='phone' placeholder='请输入联系方式'></Input>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>业务额：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" ref='phone' placeholder='请输入联系方式'></Input>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>收益／利润：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" ref='certificate'placeholder='请输入身份证号'></Input>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>购买日：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" ref='certificate'placeholder='请输入身份证号'></Input>
                </Col>
              </Row>
              <Row>
                <Col span={8}>
                  <span>到期／销毁日：</span>
                </Col>
                <Col span={16}>
                  <Input type="text" ref='certificate'placeholder='请输入身份证号'></Input>
                </Col>
              </Row>
              
        </Card>
      )
    }else{
      return(
        //add按钮
        <Card  className="family-card family-add-card">
          <i className="iconfont icon-create"  onClick={()=>{this.toggleAdd()}}></i>
          <p>新建线下业务</p>
        </Card>
      )
    }
  }
}

class FamilyInfo extends Component {
  state = {
    finance:"",
    finance: [],//输入数据暂存区
    isModify: []//card编辑状态
  };


  getFamilyInfo = (id) => {
    axios.get(api.GET_FINANCE_BASE(id))
    .then((data) => {
      console.log(data)
        this.setState({
         finance:data.data.data
        });
    })
  }

  componentWillMount() {

    this.getFamilyInfo(this.props.currentId);
   
  }

  componentWillUnMount(){
    console.log('FamilyInfo Will UnMount.')
  }

  componentWillReceiveProps(newProps){
    console.log('FamilyInfo will receive props.')
    this.getFamilyInfo(newProps.currentId)
  }
  constructor(props) {
    super(props);
    this.changeFamilyValue = this.changeFamilyValue.bind(this);
    this.saveFamilyValue = this.saveFamilyValue.bind(this);
    this.cancelFamilyValue = this.cancelFamilyValue.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  };
  // 点击新建家庭关系
  /*addNew = () => {
    // 定义 title
    const title = (
      <div className={styles.title}>
        <Input />
        <p>
          <span>保存</span>
          <span>取消</span>
        </p>  
      </div>
    )

    this.setState({
      title: title,
      cardStyle: true,
      addNew: addContent
    })
  };*/
  //修改成员信息
  changeFamilyValue(index, key, value) {
    let list = this.state.finance.map(function (item, i) {
      if (i === index) {
        item[key] = value;
      }
      return item;
    })
    this.setState({
      finance: list
    })
  };
  //保存成员信息
  saveFamilyValue(index) {
    let list = this.state.familyList.map((item, i) => {
      if (index === i) {
        return _.cloneDeep(this.state.finance[index]);
      }
      return item;
    });
    this.setState({
      familyList: list
    })
    setTimeout(() => {
      this.toggleEdit(index);
    }, 0)
  };

  //取消修改信息
  cancelFamilyValue(index) {
    let list = this.state.finance.map((item, i) => {
      if (index === i) {
        return _.cloneDeep(this.state.familyList[index]);
      }
      return item;
    })
    this.setState({
      finance: list
    })
    setTimeout(() => {
      this.toggleEdit(index);
    }, 100)
  };
  //查看和修改状态切换
  toggleEdit(index) {
    this.state.isModify[index] = !this.state.isModify[index];
    let isModify = _.cloneDeep(this.state.isModify);
    this.setState({
      isModify: isModify
    })
  };

  render() {
    return (
      <div className="families">
        {
          this.state.finance.map((item, i) => {
            //查看方式
              if (!this.state.isModify[i]) {
                return (
                  <Card
                    className="family-card"
                    title={item.project}
                    key={i}
                    extra={
                      <div>
                        <a href="javascript:void(0);" onClick={(e) => { this.toggleEdit(i) }}><i className="iconfont icon-edit"></i>编辑</a>
                        <a href="#"><i className="iconfont icon-delete"></i>删除</a>
                      </div>
                    }
                  >
                    <Row>
                      <Col span={8}>
                        <span>业务机构：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.department}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>业务额：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.money}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>收益／利润：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.profit}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>购买日：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.buyDate}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>到期／销毁日：</span>
                      </Col>
                      <Col span={16}>
                        <span>{item.expireDate}</span>
                      </Col>
                    </Row>
                  </Card>

                )
              } else {
                //编辑方式
                return (
                  <Card
                    className="family-card family-card-modify"
                    title={
                      <div className="my-card-title">
                        <Input
                          prefix={<i className="iconfont icon-customer1"></i>}
                          type="text"
                          value={item.project}
                          onChange={(e) => { this.changeFamilyValue(i, 'name', e.target.value) }}
                        />
                        <span
                          className="cancel-btn"
                          onClick={(e) => { this.cancelFamilyValue(i) }}
                        >
                          取消
                        </span>
                        <span
                          className="save-btn"
                          onClick={(e) => { this.saveFamilyValue(i) }}
                        >
                        保存
                        </span>
                      </div>
                    }
                    key={i}
                  >
                    <Row>
                      <Col span={8}>
                        <span>业务机构：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" ref='phone' placeholder='请输入联系方式'></Input>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>业务额：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" value={item.phone} onChange={(e) => { this.changeFamilyValue(i, 'phone', e.target.value) }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>收益／利润：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" value={item.certificate} onChange={(e) => { this.changeFamilyValue(i, 'certificate', e.target.value) }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>购买日：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" value={item.certificate} onChange={(e) => { this.changeFamilyValue(i, 'certificate', e.target.value) }} />
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <span>到期／销毁日：</span>
                      </Col>
                      <Col span={16}>
                        <Input type="text" value={item.certificate} onChange={(e) => { this.changeFamilyValue(i, 'certificate', e.target.value) }} />
                      </Col>
                    </Row>
                    
                  </Card>

                )
              }
          })

        }
        <AddContentForm  relation={this.state.relation} jobCategory={this.state.jobCategory}/>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    currentId: store.customer.currentCustomerInfo.id,
    mode:store.customer.currentCustomerInfo.mode
  }
}

export default connect(mapStateToProps)(FamilyInfo);
