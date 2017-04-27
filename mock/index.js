/**
 * 文件说明： 模拟数据规则
 * 详细描述：
 * 创建者： JU
 * 时间： 17.3.2
 */

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

  'GET /asd/common/dropdown/list/product': [
    {
      id: 4,
      name: '金融产品管理',
      children: [
        {
          id: 40,
          name: '产品库',
          url: '/product/all'
        }, {
          id: 41,
          name: '类别管理',
          url: '/product/classify'
        }
      ]
    }
  ],

  // 用户列表
  'GET /asd/customers': Mock.mock({
    "code": 200,
    "data": {
      "customers|10": [{
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
    'list|20': [{
      'id|+1': 1,
      'clientName': /职员|管理层|行长|片区主管/,
      'customCount|1-20': 10,
      'createTime': '2013-12-12',
    }]
  }),

  'POST /asd/privilege/customer': Mock.mock({
    "code": 200,
    "data|10": [{
      "id|+1": 1,
      "permissions": {
        "system:add|1": true,
        "system:update|1": true
      }
    }],
    "message": 'there are some message'
  }),


  //用户家庭信息
  'GET /asd/customer/:id/family': Mock.mock({
    'code': 200,
    'data|3': [{
      'id|+1': 45,
      'name': /张三|李四/,
      'certificate': /[0-9]{15}/,
      'jobCategory': /个体商户|外出务工|退休/,
      'phone': /[0-9]{11}/,
      'relation': /夫妻|父子|父女|母女/
    }],
    'message': '注释'
  }),
  //用户家庭信息关系列表
  'GET /asd/common/dropdown/list/relation': Mock.mock({
    'code': 200,
    'data': [
      {'id': 0, 'key': 'couple', 'name': '夫妻'},
      {'id': 1, 'key': 'borther', 'name': '兄弟'},
      {'id': 2, 'key': 'parent', 'name': '父子'},
    ],
    'message': 'ok'
  }),
  //用户家庭信息工作属性列表
  'GET /asd/common/dropdown/list/jobCategory': Mock.mock({
    'code': 200,
    // 'data|3': [{
    //   'id|+1': 0,
    //   'name': /个体商户|机关单位|企事业单位/,
    // }],
    'data': [
      {'id': 0, 'key': 'merchant', 'name': '个体商户'},
      {'id': 1, 'key': 'government', 'name': '机关单位'},
      {'id': 2, 'key': 'business', 'name': '企事业单位'},
    ],
    'message': 'ok'
  }),
  'GET /asd/system/roles/users': Mock.mock({
    'user': {
      // 'id|1-100': 1,
      'clientName': '@name',
      'createTime': '2013-12-12',
      'remark': '这里是备注'
    }
  }),

  //客户基本信息——个人客户
  'GET /asd/customer/:id/base': Mock.mock({
    'code': 200,
    'data': {
      'account|2-3': [{
        'accNumber': /[0-9]{13}/,
        'info': /一类账户|二类账户/
      }],
      'address': '@city(true)',
      'age|1-100': 100,
      'birth': '1990-01-30',
      'certificate': /[0-9]{18}/,
      'department': '慈溪银行',
      'grid': 'B909',
      'houseType': '商住',
      'id|+1': 1,
      'joiner|2-3': ['@name'],
      'manager': '张健钊',
      'marriage|1': true,
      'needLoan|1': true,
      'origin': '上海',
      'phone': /[0-9]{11}/,
      'wechat': 'zli3049',
      'withCar|1': true,
      'withDebt': true,
      'yearExpense': 100,
      'yearIncome': 999988,
    },
    'message': 'message!!'
  }),

  //客户工作信息
  'GET /asd/jobinfo/:id/base': Mock.mock({
    'code': 200,
    'data': {
      'jobclass': '个体户',
      'businessPrice': 1999,
      'businessScope': '100',
      'businessYield': 989888888,
      'certificate': /[0-9]{18}/,
      'downCompany': '山西省煤矿厂',
      'id|+1': 1,
      'monthIncome': '29000',
      'upCompany': '中国企业',
      'yearIncom': 19999999999
    },
    'message': ' jobinfo message!!'
  }),

  //客户基本信息——企业客户
  'GET /asd/company/:id/base': Mock.mock({
    'code': 200,
    'data': {
      'department': '上海支行',
      'grid': 'C666',
      'manager': '张健钊',
      'registertime': '2013/12/12',
      'industry': '互联网',
      'business': '3219389382900',
      'yearmoney': '999988799',
      'owner': '张三',
      'phone': /[0-9]{11}/,
      'people': '1000',
      'saliary': '100000',
      'address': '山西省-长治市-壶关县',
      'addressinfo': '山西省长治市壶关县云台山xxx路xx号',
      'joiner|2': ['@name']
    },
    'message': 'company message!'
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
      }, {
        id: 3,
        name: '晋中市分行'
      }, {
        id: 4,
        name: '长治市分行',
        childDepartment: [{
          id: 5,
          name: '壶关县分行',
          childDepartment: [{
            id: 6,
            name: "龙泉镇分理处"
          }, {
            id: 7,
            name: "城关镇分理处"
          }, {
            id: 8,
            name: "百尺镇分理处"
          }]
        }, {
          id: 9,
          name: '长治县分行'
        }]
      }]
    }

  }),
  // 获取产品分类 有层级
  'GET /asd/product/hierarchy': Mock.mock({
    code: 200,
    data: {
      id: 1,
      name: '线下产品',
      childDepartment: [{
        id: 2,
        name: '负债类',
        childDepartment: [
          {
            id: 6,
            name: '活期存款'
          }, {
            id: 7,
            name: '定期存款'
          },{
            id: 8,
            name: '通知存款'
          }
        ]
      }, {
        id: 3,
        name: '资产类',
        childDepartment: [
          {
            id: 9,
            name: '对公贷款'
          }, {
            id: 10,
            name: '个人贷款'
          }
        ]
      }, {
        id: 4,
        name: '投资权益类',
        childDepartment: [
          {
            id: 11,
            name: '理财产品'
          }, {
            id: 12,
            name: '保险产品'
          },
          {
            id: 13,
            name: '基金产品'
          }, {
            id: 14,
            name: '贵金属产品'
          }
        ]
      }, {
        id: 5,
        name: '渠道类'
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
      "director|+1": /李逵|张牛|元得/,
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
        "id|+1": 1,
        name: /(赵|钱|孙|李|周|吴|郑|王)小二/,
        phone: /[0-9]{11}/,
        position: /董事长|总行长|职员|分行长/
      }]
    },
    message: 'some message'
  }),

  'GET /asd/staff/:id/base': Mock.mock({
    code: 200,
    data: {
      name: '李小花',
      sex: '男',
      age: /[19]{2}/,
      certificateType: '身份证',
      certificate: /[0-9]{13}/,
      birth: '1995-12-11',
      phone: /[0-9]{13}/,
      wechat: /[0-9]{8}/,
      email: /[0-9]{13}@gmail.com/,
      address: '上海 闵行'
    }
  }),


  //金融业务
  'GET /asd/finance/:id/base': Mock.mock({
    'code': 200,
    'data|3': [{
      'project': /金融全家福|黄金商铺一号/,
      'buyDate': '2017／01/01',
      'department': /上海浦发|山西太原/,
      'expireDate': '2018/01/01',
      'money': 8888888,
      'id|+1': 1,
      'profit': '3.8%'
    }],
    'message': 'finance message!'
  }),

  'GET /asd/department/:id/base': Mock.mock({
    code: 200,
    data: {
      name: '壶关农商行',
      category: /总行|分行/,
      parentDepartment: '壶关农商总行',
      director: /老(王|黄|张)/,
      phone: /[0-9]{13}/,
      address: '上海 闵行'
    }
  }),

  'GET /api/common/region/parent/:id': {
    data: 'asd'
  },

  'GET /api/common/dropdown/:param': {
    error: 'error'
  },

  'GET /asd/system/users': Mock.mock({
    code: 200,
    "data|100": [{
      name: /(周|吴|郑|王|赵|钱|孙|李)小嘿/,
      phone: /[0-9]{13}/,
      post: /职员|行长|分行长/,
      department: /壶关农商行|长治市分行|壶关县分行/,
      lastTime: '2012-13-13'
    }]
  }),

  // 所有产品列表
  'GET /asd/product/list': Mock.mock({
    code: 200,
    "data|100": [{
      code: /[0-9]{5}/,
      name: /理财|保险|基金|贵金属/,
      abbreviation: "@name",
      classify: '@name  产品',
      count: /[0-9]{3}/
    }]
  }),

  // 产品分类
  'GET /asd/product/classify/list': Mock.mock({
    code: 200,
    "data|14": [{
      name: /(负债|资产|投资权益|渠道)类/,
      classify: '线下产品',
      describe: '多买多赚',
      count: /[0-9]{3}/
    }]
  }),

  //网格列表
  'POST /api/areas':{
    data:'error'
  },

  // 新增员工
  'POST /api/staff': 1,


  // // 下拉信息
  // 'GET /api/common/dropdown/:key': {
  //   message: 'err'
  // },

  // 'POST /api/areas': {
  //   err: 'asd'
  // },

  //网格列表
  'GET /asd/areas': Mock.mock({
    'code': 200,
    'data|30': [{
      'name': /龙泉镇中心广场|上海浦东新区/,
      'director': '章三',
      'orgId': '上海招商银行天山支行',
      'customCount': '社区网络',
      'residenceCount': '5000户',
      'id|+1': 1,
      'personCount': '10000000人',
      'address' : '山西省长治市壶关县龙泉镇中心广场区',
      'remark':'描述～～'
    }],
    'message': 'finance message!'
  }),
  'POST /api/demo': {
    err: 'ad'
  }
};


// axios.get('https://api.douban.com/v2/book/search?tag=novel').then(res => {console.log(res.data)}).catch(err => console.log(err))
