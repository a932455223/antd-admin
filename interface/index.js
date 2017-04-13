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


