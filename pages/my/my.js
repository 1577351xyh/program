// pages/my/my.js
import {
    ClassicModel
} from '../../model/classic.js'
import {
    BooksModel
} from '../../model/book.js'

let classicModel = new ClassicModel()
let bookModel = new BooksModel()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        //是否已经授权
        hasUserInfo: true,
        //用户头像和信息
        userInfo: null,
        //复合组件
        classics: [],
        myBooksCount: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //查看用户是否已经授权
        this.getUserInfo();
        //加载用户喜欢的书籍数
        this.getMyBook();
        //获取用户喜欢的书刊
        this.GetMyfavor();
    },
    //子组件监听授权点击函数
    onGetUserInfo: function (event) {
        //获取用户信息
        let userInfo = event.detail.userInfo
        //如果信息不为空,则已经授权,把信息传入userinfo中
        if (userInfo) {
            this.setData({
                hasUserInfo: true,
                userInfo: userInfo
            })
        }
    },
    //获取用户信息
    getUserInfo(){
        wx.getSetting({
            success: (res) => {
                console.log(res);
                if (res.authSetting['scope.userInfo']) {
                    //这里表示已经授权成功了
                    wx.getUserInfo({
                        success: (res) => {
                            this.setData({
                                hasUserInfo: true,
                                userInfo: res.userInfo
                            })
                        }
                    })
                    //没有授权成功的话
                } else {
                    this.setData({
                        hasUserInfo: false,
                    })
                }
            }
        })
    },
    //获取喜欢书籍的数量
    getMyBook(){
        bookModel.getMyBookCount()
        .then(res=>{
            this.setData({
                myBooksCount: res.data.count
            })
        })
    },
    //喜欢的书刊渲染
    GetMyfavor(){
        classicModel.getMyFavor((res)=>{
            console.log(res);
            this.setData({
                classics:res.data
            })
        })
    }
})