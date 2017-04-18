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
  'GET /api/user/list': Mock.mock({
    'name|1-10': ['@name']
  }),
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

  'POST /api/post/asd': 'asd',

  'GET /api/popular/columns': Mock.mock(popularColumns),
  // popular movies data lists
  'GET /api/movies/popular': Mock.mock(popularMovies),

  'GET PROXY /proxy/douban/*': 'https://api.douban.com/v2/',

  'POST /api/user/password': Mock.mock({
    'password': /[a-z]{5,10}/
  }),

  'GET /api/get/system/roles/list': Mock.mock({
    'list|1-100': [{
      'id|+1': 1,
      'clientName': '@name',
      'customCount|1-20': 10,
      'createTime': '2013-12-12',
    }]
  }),

  'GET /api/get/system/roles/users': Mock.mock({
    'user': {
      // 'id|1-100': 1,
      'clientName': '@name',
      'createTime': '2013-12-12',
      'remark': '这里是备注'
    }
  })



};


// axios.get('https://api.douban.com/v2/book/search?tag=novel').then(res => {console.log(res.data)}).catch(err => console.log(err))
