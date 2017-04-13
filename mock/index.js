/**
 * Created by jufei on 2017/4/11.
 */

var Mock = require('mockjs');
var axios = require('axios');

module.exports = {
  'GET /api/user/list': Mock.mock({
    'name|1-10': ['@name']
  }),

  'GET PROXY /proxy/douban/book': proxyDoubanApi('https://api.douban.com/v2/book/search'),

  'POST /api/user/password': Mock.mock({
    'password': /[a-z]{5,10}/
  })
};



function proxyDoubanApi(baseurl,methodd = 'get') {
  return function (option = null, method = methodd,url = baseurl) {
    return new Promise((resolve, rej) => {
      switch (method) {
        case 'get':
        case 'GET':
          axios.get(url, {
            params: option
          }).then(res => {
            resolve(res.data)
          });
          break;
        case 'post':
        case 'POST':
          axios.post(url, option).then(res => {
            resolve(res.data)
          });
          break;
      }
    })
  }
}
// ['frock','manClothing','womenShoes','manShoes','luggage','toiletry','snack','appliance','books','wine']

// create TRIGGER update_src_url after insert ON frock for each row update frock set src=concat('/images/goods/frock/',id,'.jpg');

// DELIMITER $
// create trigger update_src_url after insert
// on frock for each row
// begin
// declare c int;
// set c = (select stuCount from class where classID=new.classID);
// update class set stuCount = c + 1 where classID = new.classID;
// end$
// DELIMITER ;
