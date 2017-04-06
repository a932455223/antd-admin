var path = require('path');

var routesPath = require('../src/tools/routePaths.js');

module.exports = function (app, cb) {
  let urlArray = [];
  for (let key in routesPath) {
    urlArray.push(routesPath[key])
  }
  console.log(path.join(path.resolve('./static'), 'index.html'))


  app.get(urlArray, (req, res, next) => {
    res.sendFile(path.join(path.resolve('./static'),'/dist/index.html'));
    // next()
  });


  app.get('/api/login', (req, res, next) => {
    res.send('asd')
  })
};

console.log('路由已挂载');
