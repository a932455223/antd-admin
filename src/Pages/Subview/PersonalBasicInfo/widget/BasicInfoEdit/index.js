import React,{Component} from 'react'
import {
  Row,
  Col,
  Icon,
  Form,
  Input,
  Button,
  Tag,
  Select,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


export default class BasicInfoEdit extends Component{
  state = {
    tags : []
  }

  componentWillReceiveProps(next) {
    this.setState({
      tags: next.eachCustomerInfo.joiner
    })
  }

  inputChange = (e) => {
    console.log('things changed');
    // const { dispatch } = this.props;
    this.props.customerInfoBeEdit();
    // dispatch(customerInfoBeEdit())
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  }
  selectStaff = ()=>{this.setState({visible:true})}

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const {eachCustomerInfo} = this.props;
    let addkey = 100;
    const nextKeys = keys.concat(`row-${addkey++}`);
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  handleClose = () => {

  }
  render() {
    const {eachCustomerInfo, edited, currentId, createCustomerSuccess} = this.props;
    // console.log(eachCustomerInfo);
    const { getFieldDecorator, getFieldValue, getFieldsValue} = this.props.form;
    // console.log(getFieldsValue())

    const kinitialValue = function(){
      var selfkeys = [];
      eachCustomerInfo.account && eachCustomerInfo.account.map((item ,index) => {
        selfkeys.push(`row-${index}`);
      })
      return selfkeys;
    }
    getFieldDecorator('keys', { initialValue: kinitialValue() });
    const keys = getFieldValue('keys');
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 }
      },
      wrapperCol: {
        sm: { span: 15 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        sm: { span: 15, offset: 8 },
      },
    };
    const formItems = () => {
      var len = eachCustomerInfo.account && eachCustomerInfo.account.length;
      var formItemArray = keys.map((k, index) => {
        return (
          <Row key={index}>
            <Col span={12}>
              <FormItem
                label={index === 0 ? '账户' : ''}
                required={false}
                key={k}
                {...(index===0 ? formItemLayout : formItemLayoutWithOutLabel)}
                className="account"
              >
                {getFieldDecorator(`names-${k}`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  initialValue:len > index ? eachCustomerInfo.account[index].accNumber : "",

                })(
                  <Input placeholder="填写账号信息"  />
                )}
              </FormItem>
            </Col>
            <Col span={12} className="addmessage">
              <FormItem
                wrapperCol={{span: 24}}

              >

                {getFieldDecorator(`info-${k}`, {
                  initialValue:len > index ? eachCustomerInfo.account[index].info : "",
                  onChange: this.inputChange
                })(
                  <Input placeholder="填写备注信息"/>
                )}

                {
                  index === 0
                    ?
                    <i
                      className="dynamic-add-button iconfont"
                      onClick={this.add}
                    >&#xe688;</i>
                    :
                    <i
                      className="dynamic-delete-button iconfont"
                      onClick={() => this.remove(k)}
                    >&#xe697;</i>
                }
              </FormItem>
            </Col>
          </Row>
        )
      });
      return formItemArray;
    }
    const tagsitems =  this.state.tags && this.state.tags.map((item,index) => {
        return (
          <Tag key={item} closable="true" afterClose={() => this.handleClose(item)}>
            {item}
          </Tag>
        )
      })
    return (
      <Form id="mybase" className="basicinfolist">
        <Row className={currentId === -1 ? "briefinfocreate" : "briefinfoedit"} type="flex" justify="space-between">
          <Col span={7}>
            <FormItem labelCol={{span: 11}}
                      wrapperCol={{span: 13}}
                      label="所属机构">
              {getFieldDecorator('department', {
                rules: [{
                  required: true,
                  message: '选择所属机构!'
                }],
                initialValue: eachCustomerInfo.department,
                onChange: this.inputChange
              })(
                <Select
                  showSearch
                  placeholder="选择所属机构"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  getPopupContainer={() => document.getElementById('mybase')}
                >
                  <Option value="jack">慈溪支行</Option>
                  <Option value="lucy">长治支行</Option>
                  <Option value="tom">苏州支行</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem labelCol={{span: 11}}
                      wrapperCol={{span: 13}}
                      label="客户经理">
              {getFieldDecorator('manager', {
                initialValue: eachCustomerInfo.manager,
                onChange: this.inputChange
              })(
                <Select
                  showSearch
                  placeholder="选择客户经理"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  getPopupContainer={() => document.getElementById('mybase')}
                >
                  <Option value="jack">李小龙</Option>
                  <Option value="lucy">深井冰</Option>
                  <Option value="tom">爱德华</Option>
                </Select>
              )}
            </FormItem>
          </Col>

          <Col span={7}>
            <FormItem labelCol={{span: 11}}
                      wrapperCol={{span: 13}}
                      label="所属网格">
              {getFieldDecorator('grid', {
                initialValue: eachCustomerInfo.grid,
                onChange: this.inputChange
              })(
                <Select
                  showSearch
                  placeholder="选择所属网格"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  getPopupContainer={() => document.getElementById('mybase')}

                >
                  <Option value="jack">G666</Option>
                  <Option value="lucy">S889</Option>
                  <Option value="tom">Q233</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>

        <div className="personinfo">
          {formItems()}
          <Row>
            <Col span={12} className={currentId === -1 ? "phonecreate" : "phoneedit"}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="手机号：">
                {getFieldDecorator('phone', {
                  initialValue: eachCustomerInfo.wechat,
                  onChange: this.inputChange,
                  rules: [{
                    required: true,
                    message: '请填写手机号'
                  }],
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "wechatcreate" : "wechatedit"}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="微信号：">
                {getFieldDecorator('wechat', {
                  initialValue: eachCustomerInfo.wechat,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={12} className={currentId === -1 ? "idcreate" : "idedit"}>
              <FormItem labelCol={{span: 8}}
                        wrapperCol={{span: 15}}
                        label="身份证号："
                        className="idnumber"
              >

                {getFieldDecorator('certificate', {
                  initialValue: eachCustomerInfo.certificate,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>

            <Col span={12} className={currentId === -1 ? "birthcreate" : "birthedit"}>
              <FormItem labelCol={{span: 8,offset:1}}
                        wrapperCol={{span: 15}}
                        label="生日：">
                {getFieldDecorator('birth', {
                  initialValue: eachCustomerInfo.birth,
                  onChange: this.inputChange
                })(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>

          <Row className="joiners">
            <Col span={24}>
              <Col span={4}>
                <span>参与者：</span>
              </Col>
              <Col span={20}>
                {tagsitems}
                <span className="addcrewbutton"
                      onClick={this.selectStaff}>
                    <Icon type="plus-circle-o" />添加人员
                  </span>
              </Col>
            </Col>
          </Row>
        </div>
        <Row className="buttonsave">
          <Col span={24} >
            <Col span={4}>
            </Col>
            <Button type="primary" onClick={createCustomerSuccess}>保存</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
