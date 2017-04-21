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

  // 下拉菜单
  // 客户资料 sliderBar  menu 下拉菜单
  'GET /asd/common/dropdown/list/customer': [
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

  'GET /asd/common/dropdown/list/system': [
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

  'GET /asd/common/dropdown/list/organization': [
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

  'GET /asd/customer/:id/family': Mock.mock({
    "code": 200,
    "data|1-4": [{

    }]
  }),


  // 用户列表
  'GET /asd/customers': Mock.mock({
    "code": 200,
    "data": {
      "customers|1-10": [{
        "category": /企业客户|个人客户/,
        "department": "壶关农商银行XX支行",
        "id|+1": 1,
        "level": /普通客户|重点客户|未激活客户/,
        "manager": /李小龙|张小花|陈二狗/,
        "name": "@name",
        "phone": /[0-9]{11}/,
        "risk": /保守型|激进型|稳健型/,
        "attention|1": true
      }]
    },
    "pagination": {
      "count|1-1000": 1,
      "index|1-10": 1,
      "size": 10
    },
    "message": "this is some message"
  }),



  'GET /asd/popular/columns': Mock.mock(popularColumns),
  // popular movies data lists
  'GET /asd/movies/popular': Mock.mock(popularMovies),


  // 角色列表 roles
  'GET /asd/system/roles/list': Mock.mock({
    'list|1-100': [{
      'id|+1': 1,
      'clientName': '@name',
      'customCount|1-20': 10,
      'createTime': '2013-12-12',
    }]
  }),

  'POST /asd/privilege/customer': Mock.mock({
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



  'GET /asd/system/roles/users': Mock.mock({
    'user': {
      // 'id|1-100': 1,
      'clientName': '@name',
      'createTime': '2013-12-12',
      'remark': '这里是备注'
    }
  }),


  'GET /asd/customer/:id/base':Mock.mock({
    'code':200,
    'data':{
      'account|1-3':[{"card":/[0-9]{13}/,"text":"我的银行卡"}],
      'address': '@city(true)',
      'age|1-100': 100,
      'birth':'1990-01-30',
      'certificate':/[0-9]{18}/,
      'department':'慈溪银行',
      'grid':'B909',
      'houseType':'商住',
      'id|+1':1,
      'joiner|1-3':['@name'],
      'manager': '张健钊',
      'marriage|1':true,
      'needLoan|1': true,
      'origin':'上海',
      'phone':/[0-9]{11}/,
      'wechat':'zli3049',
      'withCar|1':true,
      'withDebt':true,
      'yearExpense':100,
      'yearIncome':999988,
    },
    'message':'message!!'
  }),

  // 组织机构列表 有层级
  'GET /asd/department/hierarchy': Mock.mock({
    "code": 200,
    "data|1-10": {
      "id": 1,
      "name": '山西壶关农商总行',
      childDepartment: [{
        id: 2,
        name: '大同市分行'
      },{
        id: 3,
        name: '晋中市分行'
      },{
        id: 4,
        name: '长治市分行',
        childDepartment: [{
          id: 5,
          name: '壶关县分行',
          childDepartment: [{
            id: 6,
            name: "龙泉镇分理处"
          },{
            id: 7,
            name: "城关镇分理处"
          },{
            id: 8,
            name: "百尺镇分理处"
          }]
        },{
          id: 9,
          name: '长治县分行'
        }]
      }]
    }

  }),

    // 组织机构列表
  'GET /asd/departments': Mock.mock({
    code: 200,
    "data|20": [{
      "name": "@name",
      "customerCount": /[0-9]{4}/,
      "depositCount": /[0-9]{5}/,
      "id|+1": 1,
      "director|+1": /胡锦涛|习近平|蛤/,
      "loanCount": /[0-9]{8}/
    }],
    message: 'some message'
  }),


  // 组织机构  员工列表
  'GET /asd/staffs': Mock.mock({
    code: 200,
    data: {
      pagination: {
        count: /[0-9]{5}/,
        index: /[0-9]{1}/,
        size: /10|20|30/
      },
      "staffs|100": [{
        code: /[0-9]{5}/,
        department: /壶关农商行|长治市分行|壶关县分行/,
        "id|+!": 1,
        name: '@name',
        phone: /[0-9]{11}/,
        position: /董事长|总行长|职员|分行长/
      }]
    },
    message: 'some message'
  })
};


// axios.get('https://api.douban.com/v2/book/search?tag=novel').then(res => {console.log(res.data)}).catch(err => console.log(err))
