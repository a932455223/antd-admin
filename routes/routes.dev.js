var path = require('path');
var axios = require('axios');
var routesPath = require('../src/tools/routePaths.js');

module.exports = (app, mfs, file) => {
  let urlArray = [];
  for (let key in routesPath) {
    urlArray.push(routesPath[key])
  }

  app.get([
    '/', '/login','/welcome', '/customer/*', '/system/*','/organization/*','/product/*','/grids/*','/demos/*'], function (req, res, next) {
    devMiddleWare.waitUntilValid(function () {
      var html = mfs.readFileSync(file);
      res.end(html)
    });
    next();
  });








  app.get('/menus/organization', (req, res, next) => {
    let data = [
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
    ]
    res.json(data);
    next();
  });


  app.post('/users', (req, res, next) => {
    console.log(req.body);
    res.json(JSON.stringify([
      {
        id: 1,
        name: 'jufei'
      }, {
        id: 2,
        name: 'zhangsan'
      }
    ]));
    next();
  });

  app.get('/api/book/category', (req, res, next) => {
    console.log(req.body);
    res.json([
      {
        id: 1,
        tag: 'novel'
      }, {
        id: 2,
        tag: 'essay'
      }, {
        id: 3,
        tag: 'prose'
      }, {
        id: 4,
        tag: 'poetry'
      }, {
        id: 5,
        tag: 'fairy'
      }, {
        id: 6,
        tag: 'history'
      }
    ]);
    next();
  });

  let doubanApi = axios.create({
    baseURL: 'https://api.douban.com/',
    timeout: 10000,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  });

  app.get('/douban/*', (req, res, next) => {
    var reqUrl = req.url;

    doubanApi.get(reqUrl.split('douban/')[1]).then(data => {
      res.json(data.data)
    }).catch(err => {
      console.error(err)
    });
  });
};
