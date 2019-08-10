import {HTTP} from '../http/http.js'
//继承http的方法
class likeModel extends HTTP {
    //提交点赞,只有点赞了,或者取消点赞了两种情况
    like(off,id,type) {
        //false就是没点赞
        let url = off == 'cancel' ? 'like/cancel' : 'like'
        this.request({
            url: url,
            method:'POST',
            data:{
                art_id:id,
                type:type
            },success:(data=>{
                console.log(data)
            })
        })
    }
    //获取最新的点赞信息
    getNewlike(id,type,callback){
        this.request({
            url: 'classic/' + type + '/'+ id + '/favor',
            success: callback
        })
    }

}
export {
    likeModel
};