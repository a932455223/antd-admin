import React, { Component } from 'react';
import {
  Radio,
  Button,
  Row,
  Table,
  Col
} from 'antd';
const RadioGroup = Radio.Group;

import styles from './indexStyle.less';

const ageOptions = [
  { label: '30 岁（含）以下', value: '10' },
  { label: '30 - 40 岁（含）之间', value: '8' },
  { label: '40 - 50 岁（含）之间', value: '6' },
];
const familyOptions = [
  { label: '单薪无子女', value: '1' },
  { label: '双薪无子女', value: '2' },
  { label: '双薪有子女', value: '3' },
  { label: '单薪有子女', value: '4' },
  { label: '赡/抚养第三代', value: '5' }
];
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
export default class JobInfo extends Component {
  state = {
    age: '',
    burden:'',
    onTest: true
  }
  changeTest=()=>{
    this.setState({'onTest':!this.state.onTest})
  }
  onChange = (e,key) => {
    console.log('radio checked', e.target.value);
    this.setState({
      [key]: e.target.value,
    });
  }

  // 重新测试，
  resetTest = () => {
    this.setState({
      age: '',
      burden: '' 
    })
    
  }

  // 完成测试，获取分数
  finishTest = () => {
    const one = this.state.value * 10;
    console.log(one);
    this.changeTest();
  }

  render() {

    if (this.state.onTest) {
      return (
        <ul className='my-test' >
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
        </ul>
      )
    } else {
      return (
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
        </div>

      )
    }


  }
}
