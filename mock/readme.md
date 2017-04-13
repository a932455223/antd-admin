# 假数据 及 接口转发

## 前端api命名规则
+ 自身接口数据
>  /api/*

+ 接口转发
> /proxy/*

## 实现原理
1. server端拦截所有请求，获取请求url
2. 通过正则`/\/api\//`和`/\/proxy\//`判断是否进行接口转发
3. 通过一个函数将url 处理为 mock配置文件的key值
```
'GET /api/*'
'POST /api/*'
'PROXY GET /proxy/*'
'PROXY POST/proxy/*'
```
4. 判断是否需要接口转发进行不同处理
+ 不需要转发
```
res.json(mock[url]);
```

+ 需要转发
```
mock[url](req.query).then( data => {
        res.json(data)
      })
```


## 实例
+ 不需要转发

```
// 前端请求
axios.get('/api/user/list')
// server端处理
1. 获取url '/api/user/list'
2. 将url 处理为 ‘GET /api/user/list’
3. 返回假数据   Mock.mock({
    'name|1-10': ['@name']
  }),
```

+ 需要转发

```
// 前端请求
axios.get('/proxy/douban/book')；
// server 处理
1. 获取 url ’/proxy/douban/book‘
2. 将url 处理为 ‘GET PROXY /proxy/douban/book’
3. 请求需要转发数据
4. 返回数据
  mock[url](req.body).then(data => {
        res.json(data)
      })
```

## 使用
在/mock/index.js 文件中添加规则
```
module.exports = {
  // 不需要转发
  '请求方式(大写 请求url': data,

  // 需要转发
  '请求方式 PROXY 请求url': proxy('需转发url')



  'GET /api/user/list': Mock.mock({
    'name|1-10': ['@name']
  }),

  'GET PROXY /proxy/douban/book': proxyDoubanApi('https://api.douban.com/v2/book/search'),

  'POST /api/user/password': Mock.mock({
    'password': /[a-z]{5,10}/
  })
};

```
