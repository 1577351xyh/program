import { HTTP } from '../http/httpps.js'

class Keyword extends HTTP{
    
     key = 'q'
     max = 10;
    
    //获取热搜索,发生请求
    gethot(){
        return this.request({
            url:"book/hot_keyword"
        })
    }
    //获取历史搜索
    gethistory(){
       var keyarr = wx.getStorageSync(this.key)
       return keyarr;
    }
    // 设置新的历史搜索
    sethistory(text){
       var keyarr = this.gethistory();
        //如果keyarr不是一个空数组
        if(keyarr){
            //如果数组中没有这个历史搜索
            if(keyarr.indexOf(text)==-1){
                //当前数组的长度
               let length = keyarr.length;
               //如果当前数组的长度大于10
               if(length>=this.max){
                   //把这个文本从arr中删除
                   keyarr.pop(text);
               }
                //否则就把把这个添加到数组第一个
                keyarr.unshift(text);
            }
            wx.setStorageSync(this.key, keyarr)
        }else{
            //如果是一个空数组
            keyarr = [text];
            //添加到缓存中
            wx.setStorageSync(this.key, keyarr)
        }
    }
   

}

export {
    Keyword
}