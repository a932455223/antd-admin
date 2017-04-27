/**
 * Created by Yeapoo on 2017/03/20.
 */


var express = require('express'),
  webpack = require('webpack'),
  path = require('path'),
  colors = require('colors'),
  bodyParser = require('body-parser'),
  axios = require('axios'),
  cookieParser = require('cookie-parser'),
  interfaceCF = require('./proxy/interface'),
  multipart = require('connect-multiparty'),
  multipartMiddleware = multipart();
var proxy = require('express-http-proxy');
var qs = require('qs');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var app = express();
var isDeveloping = process.env.NODE_ENV === 'development';

var port = isDeveloping ? 8888 : 9999;

app.use('/', express.static(path.join(__dirname + '/static')));

// app.use(bodyParser.json());
// app.use(cookieParser());
// app.use(bodyParser.urlencoded());

// app.get('/',(req,res) => {
//   res.sendfile(path.resolve(__dirname, 'static/dist', 'index.html'))
// });

if (isDeveloping) {
  console.log('开发模式启动'.info);
  var config = require('./webpack.config/webpack.config.dev');
  var compiler = webpack(config);
  devMiddleWare = require('webpack-dev-middleware')(compiler, {
    publicPath: '/dist',
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },

  });
  app.use(devMiddleWare);
  app.use(require('webpack-hot-middleware')(compiler));
  var mfs = devMiddleWare.fileSystem;
  var file = path.join(config.output.path, 'index.html');


  let routes = require('./routes/routes.dev.js');
  routes(app, mfs, file);

  console.log('路由挂载完成'.info)

} else {
  let routes = require('./routes/routes.prod.js');

  console.log("生产模式启动".info);

  routes(app);
}

// app.post('/api/areas',(req,res,next) => {
//   // next();
// })

const proxyHost = '115.159.58.21:8099';
// const proxyHost = 'http://192.168.1.39:8080/crm';
// const proxyHost = 'http://localhost:9999';

app.use('/', proxy(proxyHost, {
  filter: (req, res) => {
    return req.url.indexOf('/api/') === 0;
  },
  proxyReqPathResolver: (req, res) => {
    console.log('body',qs.stringify(req.body));
    console.log('/crm' + require('url').parse(req.url).pathname);
    return '/crm' + require('url').parse(req.url).pathname;
  }
}));


interfaceCF(app);


app.listen(port, (err, success) => {
  if (err) {
    console.log(err)
  } else {
    console.log(`server start as port ${port}`.info)
  }
});
