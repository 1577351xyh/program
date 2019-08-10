import {
  config
} from '../comfig.js';

class HTTP {
  //传一个需要接受的参数,传过来的是一个对象
  request(obj) {
    //url data method
    if (!obj.method) {
      obj.method = "GET";
    }
    wx.request({
      url: config.api + obj.url,
      method: obj.method,
      data: obj.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      //判断,有没有传入success,如果没就省略
      success: (data) => {
          if (data.statusCode == 200 || data.statusCode ==201) {
            //&&运算符
            //obj.success && obj.success(data);
              if(obj.success == undefined){
                  return;
              }else{
                  obj.success(data);
              }
        }
      }
    })
  }
}

export {
  HTTP
};