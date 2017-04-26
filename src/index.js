// /**
//  * 文件说明： 入口文件
//  * 详细描述：
//  * 创建者： JU
//  * 时间： 17.3.2
 // */
// import "babel-polyfill";
import React from 'react';
import {render} from  'react-dom';
import Root from './containers/Root.dev';
import configStores from './redux/store'
const store = configStores();

import S from './components/SelectStaff'
// render(<S/>,document.getElementById('root'));

render(<Root store= {store}/>,document.getElementById('root'));



// import axios from 'axios';



// axios.post('/api/areas',{
// 	areaType:72,
// 	director:"张三",
// 	orgId:1,
// 	text:'fsafds',
// 	index:1,
// 	size:10
// }).then( res => {
// 	console.log(res)
// })