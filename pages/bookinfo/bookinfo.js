// pages/bookinfo/bookinfo.js
import {
    BooksModel
} from '../../model/book.js'
let books = new BooksModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //书单详情
        info: Object,
        //书单的点赞信息
        favor: Object,
        //书店的短评
        short: Object,
        summary: {},
        like: false,
        count: Number,
        posting: false
    },
    onPost() {
        this.setData({
            posting: true
        })
    },
    onCancel() {
        this.setData({
            posting: false
        })
    },
    ongettext(event) {
        //用户输入为value,子组件穿过来的值text
        let text = event.detail.value || event.detail.text;
        let id = this.data.info.id;
        if (text.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
        } else if (text.length == 0) {
            wx.showToast({
                title: '短评不能为空',
            })
            return;
        } else {
            books.postComment(id, text)
                .then(res => {
                    wx.showToast({
                        title: '成功:+1',
                        icon:'none'
                    })
                    //在当前的数组里面一个对象
                    this.data.short.unshift({
                        content: text,
                        nums:1
                    })
                    //更新数据
                    this.setData({
                        posting:false,
                        short: this.data.short
                    })

                })
        }


    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //如果网速慢会造成一些加载上的延迟,
        //需求:当所有的请求都成功后,再展示页面
        wx.showLoading({
            title:"正在加载中"
        })
        const id = options.id;
        //promise实例
        //获取详情
        const getinfo = books.getinfo(id);
        //获取点赞
        const getfavor = books.getfavor(id);
        //获取短评
        const getshort = books.getshort(id);

        /**
         * 接收一个参数array
         * array中存放promise实例
         * res返回的是实例对象中的res数据,根据对应的下标可以取到
         */
        Promise.all([getinfo,getfavor,getshort])
        .then(res=>{
            this.setData({
                info: res[0].data,
                favor:res[1].data,
                count:res[1].data.fav_nums,
                short:res[2].data.comments
            })
            wx.hideLoading()
        })
        // books.getinfo(id).then(res => {
        //     this.setData({
        //         info: res.data,
        //     })
        // })
        // //书单的点赞
        // books.getfavor(id).then(res => {
        //     this.setData({
        //         favor: res.data,
        //         count: res.data.fav_nums
        //     })
        // })
        // // 书单的短评
        // books.getshort(id).then(res => {
        //     this.setData({
        //         short: res.data.comments
        //     })
        // })
    },
})