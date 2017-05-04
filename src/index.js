/**
 * 文件说明： 入口文件
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
import "babel-polyfill";
import React from "react";
import { render } from "react-dom";
import Root from "./containers/Root.dev";
import configStores from "./redux/store";
import ajax from './tools/POSTF'
import $ from 'jquery'
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

// $.get('/api/customer/individual/4/base').then((res)=>{
//   console.dir(res)
// })
// let obj = { "accounts": [{ "accountNo": "32432432", "remark": "备注1", "priority": 1 }, { "accountNo": "797323", "remark": "备注2", "priority": 2 }], "address": "江苏省 南京市 江宁区 金陵科技学院", "addressCode": "16 220 1843", "age": 24, "birth": "1993-10-21", "carPrice": null, "certificate": "320621199310216933", "debtAmount": 27, "department": 1, "grid": 3, "houseType": 17, "id": 4, "joinerIds": [18,19,21], "loanAmount": 33, "loanPurpose": 39, "manager": 25, "marryStatus": 14, "name": null, "needLoan": 31, "origin": "南通", "phone": "18625170698", "wechat": "wechat", "withCar": 19, "withDebt": 24, "yearExpense": 100.00, "yearIncome": 543.34 }

// $.ajax({
//     url: '/api/customer/individual/4/base/tab1',
//     type: 'PUT',
//     data: JSON.stringify(obj),
//     dataType: "json",
//     contentType: "application/json",
//     success: function(res) {
//         console.dir(res)
//     }
// })




// ajax.PutJson('/api/customer/individual/4/base/tab1',obj).then((res)=>{
//   console.dir(res)
// })

