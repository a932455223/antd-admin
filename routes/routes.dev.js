var path = require('path');
var axios = require('axios');
var routesPath = require('../src/tools/routePaths.js');

module.exports = (app, mfs, file) => {
  let urlArray = [];
  for (let key in routesPath) {
    urlArray.push(routesPath[key])
  }

  console.log(urlArray);
  app.get([
    '/', '/login', '/customer/*', '/system/*'
  ], function(req, res, next) {
    devMiddleWare.waitUntilValid(function() {
      var html = mfs.readFileSync(file);
      res.end(html)
    });
    next();
  });

  app.get('/menus/customer', (req, res, next) => {
    let data = [
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
    ]
    res.json(data);
    next();
  });

  app.get('/menus/system', (req, res, next) => {
    let data = [
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
