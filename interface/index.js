/**
 * Created by jufei on 2017/4/11.
 */
var mock = require('../mock');

module.exports = function (app) {
  app.get('*', (req, res, next) => {
    console.log(req.url);
    let url = urlDispose(req.url.trim(), 'GET');
    console.log('URL',url);
    if (url.indexOf('PROXY') > 0) {
      console.log(req.query);
      console.log('proxy');
      mock[url](req.query, url.split(' ')[0]).then(data => {
        res.json(data)
      })
    } else if (url.startsWith('GET')) {

      res.json(mock[url]);


    } else {
      next();
    }
  });

  app.get('/limitList',(req,res) =>{
    res.json(limitList);
  });

  app.post('*', (req, res) => {
    console.log(req.url);
    let url = urlDispose(req.url.trim(), 'POST');
    console.log(url);
    if (url.startsWith('POST')) {


      res.json(mock[url]);


    } else if (url.indexOf('PROXY') > 0) {
      console.log(req.query);
      console.log('proxy');

      mock[url](req.body).then(data => {
        res.json(data)
      })


    } else {
      next();
    }
  })
};


function urlDispose(url, method) {
  if (/(\/proxy\/)/.test(url)) {
    return `${method} PROXY ${url.split('?')[0]}`;
  } else if (/(\/api\/)/.test(url)) {
    return method + ` ${url.split('?')[0]}`;
  } else {
    return url;
  }
}


const limitList = [{
  title: '客户管理',
  id: '0',
  limitList: ['总行','支行','所有','自己'],
  defaultLimit: '',
  limit: '',
  nodes: [
    {
      title: '客户列表',
      id: '0-0',
      limitList: ['总行','支行','所有','自己'],
      defaultLimit: '',
      limit: '',
      nodes: [{
        title: '信息查看',
        id: '0-0-0',
        limitList: ['总行','支行','所有','自己'],
        defaultLimit: '',
        limit: '',
      },{
        title: '客户建档',
        id: '0-0-1',
        limitList: ['总行','支行','所有','自己'],
        defaultLimit: '',
        limit: '',
      },{
        title: '删除客户',
        id: '0-0-2',
        limitList: ['总行','支行','所有','自己'],
        defaultLimit: '',
        limit: '',
      }]
    },
    {
      title: '公海客户',
      id: '0-1',
      limitList: ['总行','支行','所有','自己'],
      defaultLimit: '',
      limit: '',
      nodes: []
    },
    {
      title: '网格管理',
      id: '0-2',
      limitList: ['总行','支行','所有','自己'],
      defaultLimit: '',
      limit: '',
      nodes: [{
        title: '网格列表',
        id: '0-2-0',
        limitList: ['总行','支行','所有','自己'],
        defaultLimit: '',
        limit: '',
        nodes: [{
          title: '信息查看',
          id: '0-2-0-0',
          limitList: ['总行','支行','所有','自己'],
          defaultLimit: '',
          limit: ''
        }]
      }]
    }
  ]
}];
