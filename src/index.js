/**
 * 文件说明： 入口文件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import Root from "./containers/Root.dev";
import configStores from "./redux/store";

const store = configStores();
//

render(<Root store={store}/>, document.getElementById('root'));


// axios.post('/api/staff',$.param({
//   "certificate": '13434',
//   "code": "34135",
//   "inductionTime": '2012-12-12',
//   "departments": [1,2,3],
//   "isUser": false,
//   'name': 'ju',
//   'phone': '1312414124',
//   'position': 3
// }), {
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded'
//   }
// }).then(res => {
//   console.log(res)
// });

// axios.post('/api/login',qs.stringify({
//   "certificate": '13434',
//   "code": "34135",
//   "inductionTime": '2012-12-12',
//   "departments": [1,2,3],
//   "isUser": false,
//   'name': 'ju',
//   'phone': '1312414124',
//   'position': 3
// },{ arrayFormat: 'brackets' }), {
//   headers: {
//     'content-type': 'application/x-www-form-urlencoded'
//   }
// }).then(res => {
//   console.log(res)
// });

// $.post('/api/staff',{
//   certificate: '13434',
//   code: "34135",
//   inductionTime: '2012-12-12',
//   departments: [1,2,3],
//   isUser: false,
//   name: 'ju',
//   phone: '1312414124',
//   position: 3,
//   roles: [1,2,3,4]
// },function (data,status) {
//   console.log(data);
//   console.log(status)
// });
//
// console.log(1)

// import axios from 'axios';
//
// const data = {
//   accounts: [{accountNo: "333", priority: 1, remark: ""}],
//   address: "江苏省 南京市 江宁区 金陵科技学院",
//   birth: "",
//   certificate: "320621199710216526",
//   department: 2,
//   grid: 6,
//   joinerIds: [],
//   manager: 25,
//   name: "严复",
//   origin: "",
//   phone: "18625170690",
//   wechat: "Yan"
// };
//
//
// axios.post('/api/customer/individual/base',data)
//   .then( res => {
//     console.log(res)
//   })
//   .catch( err => {
//     console.log(err)
//   })
//
