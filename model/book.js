import { HTTP } from '../http/httpps.js'

//继承http的方法
class BooksModel extends HTTP{
    //获取精品书单
    gethotbook(){
        return this.request({
            url:'/book/hot_list'
        });
    }
    //根据id获取当前书单的详情
    getinfo(id){
        return this.request({
            url:`book/${id}/detail`
        })
    }
    //根据id获取当前书单的点赞数
    getfavor(id){
        return this.request({
            url:`book/${id}/favor`
        })
    }
    //根据id获取当前书单短评
    getshort(id){
        return this.request({
            url:`book/${id}/short_comment`
            
            })
    }
    //新增短评
    postComment(id,text){
        return this.request({
            url:'book/add/short_comment',
            method:'POST',
            data:{
                book_id:id,
                content:text
            }
        })
    }
    //书籍搜索
    getbook(num, q) {
        return this.request({
            url: "/book/search",
            data: {
                start: num,
                q
            }
        })
    }
    //获取喜欢书籍的数量
    getMyBookCount() {
        return this.request({
            url: '/book/favor/count',
        })
    }
}
// 暴露
export {
    BooksModel
};