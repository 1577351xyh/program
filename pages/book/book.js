// pages/book/book.js
import { BooksModel} from '../../model/book.js'
import {Keyword} from '../../model/keyword.js'

let Books = new BooksModel();
let Keywords = new Keyword();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bookarr:[],
        search:false,
        hotArray:[],
        more:0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        Books.gethotbook()
        .then(res=>{
            this.setData({
                bookarr:res.data
            })
        })
    },

    //点击搜索
    onSearch(){ 
        this.setData({
            search:true
        })
        //加载搜索请求
        Keywords.gethot()
        .then(res=>{
            this.setData({
                hotArray:res.data.hot
            })
        })

    },
    //子组件取消,触发父组件方法
    onCancel(){
        this.setData({
            search: false
        })
    },

    /**
     * 页面下拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('我被触发了')
        this.data.more +=1;
        this.setData({
            more: this.data.more
        })
        console.log(this.data.more)
    },

})