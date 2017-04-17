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
var popularMovies = require('./falseData/popularMovies');


module.exports = {
  'GET /api/user/list': Mock.mock({
    'name|1-10': ['@name']
  }),
  'POST /api/post/asd': 'asd',

  'GET /api/movies/popular': Mock.mock(popularMovies),

  'GET PROXY /proxy/douban/*': 'https://api.douban.com/v2/',

  'POST /api/user/password': Mock.mock({
    'password': /[a-z]{5,10}/
  })
};


// axios.get('https://api.douban.com/v2/book/search?tag=novel').then(res => {console.log(res.data)}).catch(err => console.log(err))
