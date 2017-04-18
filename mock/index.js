/**
 * 文件说明： 模拟数据规则
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */
// impo

var Mock = require('mockjs');
var axios = require('axios');

// myCustomer false data
var popularColumns = require('./falseData/popularColumns');
var popularMovies = require('./falseData/popularMovies');


module.exports = {
  'GET /user/list': Mock.mock({
    'name|1-10': ['@name']
  }),

  // 下拉菜单

  // 客户资料 sliderBar  menu 下拉菜单
  'GET /common/dropdown/list/customer': [
    {
      id: 1,
      name: '客户资料',
      children: [
        {
          id: 10,
          name: '我的客户',
          url: '/customer/my'
        }, {
          id: 11,
          name: '我关注的客户',
          url: '/customer/focused'
        }, {
          id: 12,
          name: '公海客户',
          url: '/customer/undistributed'
        }, {
          id: 13,
          name: '我下属的客户',
          url: '/customer/subordinate'
        }, {
          id: 14,
          name: '我参与的客户',
          url: '/customer/participation'
        }, {
          id: 15,
          name: '新分配给我的客户',
          url: '/customer/recentlyDistributed'
        }, {
          id: 16,
          name: '我的全部客户',
          url: '/customer/all'
        }
      ]
    }
  ],

  'GET /common/dropdown/list/system': [
    {
      id: 2,
      name: '用户和权限',
      children: [
        {
          id: 20,
          name: '用户管理',
          url: '/system/users'
        }, {
          id: 21,
          name: '角色和权限管理',
          url: '/system/roles'
        }
      ]
    }
  ],

  'GET /common/dropdown/list/organization': [
    {
      id: 3,
      name: '组织机构管理',
      children: [
        {
          id: 30,
          name: '员工管理',
          url: '/organization/staff'
        }, {
          id: 31,
          name: '组织管理',
          url: '/organization/branches'
        }
      ]
    }
  ],

  // 用户列表
  'GET /api/customers': Mock.mock({
    "code": 200,
    "data": {
      "customers|1-10": [{
        "category": /企业客户|个人客户/,
        "department": "壶关农商银行XX支行",
        "id|+1": 1,
        "level": /休眠客户|活跃客户/,
        "manager": /李小龙|张小花|陈二狗/,
        "name": "@name",
        "phone": /[0-9]{13}/,
        "risk": /安全型|风险型/,
        "attention|1": true
      }]
    },
    "pagination": {
      "count|1-1000": 1,
      "index|1-10": 1,
      "size": /10|20|30/
    },
    "message": "this is some message"
  }),



  'GET /popular/columns': Mock.mock(popularColumns),
  // popular movies data lists
  'GET /movies/popular': Mock.mock(popularMovies),


  // 角色列表 roles
  'GET /asd/system/roles/list': Mock.mock({
    'list|1-100': [{
      'id|+1': 1,
      'clientName': '@name',
      'customCount|1-20': 10,
      'createTime': '2013-12-12',
    }]
  }),

  'GET /api/privilege/customer': Mock.mock({
    "code": 200,
    "data|1-10": [{
      "id|+1": 1,
      "permissions": {
        "system:add|1": true,
        "system:update|1": true
      }
    }],
    "message": 'there are some message'
  }),


  // 'GET /customer/:id/base': Mock.mock({
  //   a: 1
  // }),


  'GET /get/system/roles/users': Mock.mock({
    'user': {
      // 'id|1-100': 1,
      'clientName': '@name',
      'createTime': '2013-12-12',
      'remark': '这里是备注'
    }
  })



};


// axios.get('https://api.douban.com/v2/book/search?tag=novel').then(res => {console.log(res.data)}).catch(err => console.log(err))
