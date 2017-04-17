import React, { Component } from 'react';
import {
  Radio,
  Button
} from 'antd';
const RadioGroup = Radio.Group;

import styles from './indexStyle.scss';

const options = [
  { label: '30 岁（含）以下', value: '10' },
  { label: '30 - 40 岁（含）之间', value: '8' },
  { label: '40 - 50 岁（含）之间', value: '6' },
];


export default class JobInfo extends Component {
  state = {
    value: '',
  }

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  // 重新测试，
  resetTest = () => {
    this.setState({
      value: ''
    })
  }

  // 完成测试，获取分数
  finishTest = () => {
    const one = this.state.value * 10;
    console.log(one);
  }

  render() {
    return(
      <ul className={styles.risk}>
        <li>
          <p>1. 您的年龄为？</p>
          <RadioGroup onChange={this.onChange}
                      value={this.state.value}
                      options={options}
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
  }
}
