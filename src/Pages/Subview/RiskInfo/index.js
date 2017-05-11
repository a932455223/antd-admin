import React, {Component} from 'react';
import {
  Radio,
  Button,
  Row,
  Table,
  Col,
  Form,
} from 'antd';
const RadioGroup = Radio.Group;
const FormItem = Form.item;
import ajax from '../../../tools/POSTF.js';
import styles from './indexStyle.less';
import {connect} from 'react-redux';
import api from './../../../../API';
const columns = [{
  title: '分数',
  dataIndex: 'code',
  key: 'code'
}, {
  title: '风险承受能力分类',
  dataIndex: 'ability',
  key: 'ability',
}, {
  title: '定义及建议',
  dataIndex: 'advice',
  key: 'advice'
}]
const dataSource = [
  {
    'code': '50 分以内（含 50 分）',
    'ability': '安全型',
    'advice': '代表您投资谨慎，保护本金不受损失和保证资产流动性是投资的首要目标。'
  },
  {
    'code': '50 分-65 分（含 65 分）',
    'ability': '保守型',
    'advice': '代表您投资谨慎，保护本金不受损失和保证资产流动性是投资的首要目标。'
  },
  {
    'code': '65 分-80 分（含 80 分）',
    'ability': '稳健型',
    'advice': '代表您对投资有一定的了解，能够根据跟人的投资需求，将资产在高风险和低风险资产之间分配，愿意将一部分资产投资于高风险高...'
  },
]
class RiskInfo extends Component {
  state = {
    questions: [],
    answers:[],
    type:'',
  }
  getCustomerType(code){
    var type=''
    if(code<51){
      type="安全型"
    }else if(code<66){
      type="保守型"

    }else if(code<81){
      type="稳健型"

    }
    return type;
  }
  //----------APIS-----------
  // 获取题目
  getCustomerRiskQuestions = (id) => {
    ajax.Get(api.GET_CUSTOMER_RISKQUESTIONS(id))
      .then(res => {
        if (res.data.code === 200) {
          if (res.data.message === 'OK') {
            this.setState({
              questions: res.data.data.questions,
              scores:res.data.data.scores,
              type:this.getCustomerType(res.data.data.scores)
            })
          }
          console.log(res)
        } else {
          console.log(res.data.message)
        }
      })
  }
  // 提交测试
  putCustomerRiskQuestion = (answers) => {
    ajax.Put(api.PUT_CUSTOMER_RISKQUESTION(this.props.currentId), {
      answers:answers
    })
      .then(res => {
        // console.log(res)
        if(res.data.code===200){
          if(res.data.message==='OK'){
            this.setState({riskCode:res.data.data});
          }
        }
      })
  }

  componentWillMount() {
    this.getCustomerRiskQuestions(this.props.currentId);
    // this.putCustomerRiskQuestion();
  }

  componentWillReceiveProps(newProps) {
    // this.getCustomerRiskQuestions();
    if(newProps.currentId!==this.props.currentId){
      this.getCustomerRiskQuestions(newProps.currentId);
      // console.log('重置数据')
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let _this=this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        // _this.setState({
        //   answers:Object.values(values).filter(Boolean)
        // })
        this.putCustomerRiskQuestion(Object.values(values).filter(Boolean));
        this.getCustomerRiskQuestions(this.props.currentId);
      }

    });
  }

  render() {
    let {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    return (
      <div className='risk'>
        <div className="my-test">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            {
              this.state.questions.map((item, index) => {
                let selectedId=null;
                let selectedValue;
                item.options.forEach(option =>{
                  if(option.checked) selectedValue=option.id;
                })
                return (
                  <div key={item.id}>
                    <p>{index+1}&nbsp;、&nbsp;{item.title}</p>
                    {getFieldDecorator('a'+item.id, {
                      rules: [],
                      valuePropName:'value',
                      initialValue:selectedValue
                    })(
                      <RadioGroup key={item.id}>
                        {
                          item.options.map((option, i) => {
                            return (
                              <Radio key={option.id} value={option.id} defaultChecked={option.checked}>
                                {option.option}
                              </Radio>
                            )
                          })

                        }
                      </RadioGroup>
                    )}
                  </div>
                )
              })
            }
            <Button type="submit" htmlType="submit">提交</Button>
          </Form>
        </div>

        <div className="test-result">
          <div className="my-row">
            <div className="test-score">
              <span>
                <i>{this.state.scores}</i>分
              </span>
              <span>
                {this.state.type}
              </span>
            </div>
            <div className="test-type">
              <h2>
                {this.state.type}客户
                <Button onClick={()=>{this.resetTest();this.changeTest();}} >重新测试</Button>
              </h2>
              <p>
                从总体投资来看，在风险较小的情况下获得一定的收益是您主要的投资目的。您通常愿意使本金面临一定的风险，但在做投资决定时，对风险总是客观存在的道理有清楚的认识，会仔细地对将要面临的风险进行认真的分析。总体来看，愿意承受市场的平均风险。
              </p>
            </div>
          </div>
          <Row>
            <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            />
          </Row>
        </div>
      </div>


    )


  }
}
const mapStateToProps = (store) => {
  return {
    currentId: store.customer.currentCustomerInfo.id,
    mode: store.customer.currentCustomerInfo.mode
  }
}

export default connect(mapStateToProps)(Form.create()(RiskInfo));

// const ageOptions = [
//   { label: '30 岁（含）以下', value: '10' },
//   { label: '30 - 40 岁（含）之间', value: '8' },
//   { label: '40 - 50 岁（含）之间', value: '6' },
// ];
// const familyOptions = [
//   { label: '单薪无子女', value: '1' },
//   { label: '双薪无子女', value: '2' },
//   { label: '双薪有子女', value: '3' },
//   { label: '单薪有子女', value: '4' },
//   { label: '赡/抚养第三代', value: '5' }
// ];

// changeTest=()=>{
//   this.setState({'onTest':!this.state.onTest})
// }
// onChange = (e,key) => {
//   console.log('radio checked', e.target.value);
//   this.setState({
//     [key]: e.target.value,
//   });
// }

// // 重新测试，
// resetTest = () => {
//   this.setState({
//     age: '',
//     burden: ''
//   })

// }
// ajax.Get(api.POST_CALCULATESCORE,{'customerId':1,list:[{optionId:1,questionId:2},{optionId:7,questionId:8},{optionId:13,questionId:14},{optionId:19,questionId:20},{optionId:25,questionId:26},{optionId:31,questionId:32},{optionId:37,questionId:38},{optionId:42,questionId:43},{optionId:48,questionId:49},{optionId:54,questionId:55},{optionId:60,questionId:61},{optionId:65,questionId:66}]})
// .then( res => {
//   // if(res.data.code===200){
//   //   if(res.data.message==='OK'){
//   //     // console.log('增加成功')
//   //     this.getCustomersFinances(this.props.currentId);
//   //     this.toggleAdd();
//   //     this.toggleAddFinanceCardLoading();
//   //   }
//   // }else{
//   //   // console.log(res.data.message)
//   // }
//   console.log(res)
// })

// 完成测试，获取分数
// finishTest = () => {
//   const one = this.state.value * 10;
//   console.log(one);
//   this.changeTest();
// }

/*<ul className='my-test' >
 <li>
 <p>1. 您的年龄为？</p>
 <RadioGroup onChange={(e)=>{this.onChange(e,'age')}}
 value={this.state.age}
 options={ageOptions}
 >
 </RadioGroup>
 </li>
 <li>
 <p>2. 您的家庭负担是？</p>
 <RadioGroup onChange={(e)=>{this.onChange(e,'burden')}}
 value={this.state.burden}
 options={familyOptions}
 >
 </RadioGroup>
 </li>

 <footer>
 <Button onClick={this.resetTest}>重新测试</Button>
 <Button type='primary'
 onClick={this.finishTest}>完成测试</Button>
 </footer>
 </ul>*/



/*return (
 <div>

 <div className="test-result">
 <div className="my-row">
 <div className="test-score">
 <span>
 <i>54</i>分
 </span>
 <span>
 保守型
 </span>
 </div>
 <div className="test-type">
 <h2>
 保守型客户
 <Button onClick={()=>{this.resetTest();this.changeTest();}} >重新测试</Button>
 </h2>
 <p>
 从总体投资来看，在风险较小的情况下获得一定的收益是您主要的投资目的。您通常愿意使本金面临一定的风险，但在做投资决定时，对风险总是客观存在的道理有清楚的认识，会仔细地对将要面临的风险进行认真的分析。总体来看，愿意承受市场的平均风险。
 </p>
 </div>
 </div>
 <Row>
 <Table
 dataSource={dataSource}
 columns={columns}
 pagination={false}
 />
 </Row>
 </div>
 </div>*/




