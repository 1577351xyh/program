import {
    config
} from '../comfig.js';

class HTTP {
    //传一个需要接受的参数
    request({url,data={},method='GET'}){
        //创建一个promise对象.在promiss对象里面执行异步操作,把参数传人,
        //返回一个promise对象
        return new Promise((resolve,reject)=>{
            this._request(url,resolve,data,method)
        })
    }

    _request(url,resolve,data={}, method='GET'){
        wx.request({
            url: config.api + url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/json',
                'appkey': config.appkey
            },
            //判断,有没有传入success,如果没就省略
            success: (data) => {
                    //&&运算符
                    //obj.success && obj.success(data);
                    resolve(data)
            }
        })
    }
}

export {
    HTTP
};