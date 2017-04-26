/**
 * 文件说明： 入口文件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import "babel-polyfill";
import React from 'react';
import {render} from  'react-dom';
import Root from './containers/Root.dev';
import configStores from './redux/store'
const store = configStores();

import S from './components/SelectStaff'
// render(<S/>,document.getElementById('root'));

render(<Root store= {store}/>,document.getElementById('root'));

import axios from 'axios';
import qs from 'qs';


// var axios = require('axios');
// const a = axios.create({
//   // baseURL: 'htt://localhost:8888',
//   timeout: 10000,
//   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
// });

// axios.post('/api/areas',qs.stringify({
//   areaType:72,
//   director:"张三",
//   orgId:1,
//   index:1,
//   size:10
// }),{
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded'
//   }
// }).then( res => {
//   console.log(res)
// });
