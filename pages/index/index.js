// import {HTTP} from '../../http/http.js'
// let http = new HTTP();

import {
    ClassicModel
} from '../../model/classic.js'
let classic = new ClassicModel();

import {
    likeModel
} from '../../model/like.js'
let likesModel = new likeModel();

// pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classic: undefined,
        ids: undefined,
        rightoff: false,
        //左边是不是最后一张
        rightlast: true,
        //右边是不是最后一张
        leftfrist: false,
        // 当前点赞数
        likeNum: 0,
        // 当前的点赞状态
        likeType: false

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        classic.getlatest(data => {
            this.getnew(data.data.id, data.data.type);         
            this.setData({
                //点赞的数量和点赞的状态
                classic: data.data,
                ids: data.data.id,
                likeNum: data.data.fav_nums,
                likeType: data.data.like_statuws
            })
        })
    },

    //当心心被点击
    onlike: function(event) {
        //请求点赞的接口(当添加了缓存之后,classic中的数据就是缓存中的数据,所有每次都需要重新更新数据)
        let behavier = event.detail.behavier;
        //提交店点赞活取消点赞
        likesModel.like(behavier, this.data.ids, this.data.classic.type);
    },

    //接收子组件传来的向左边向右边点击事件
    //左边的点击事件
    onleft: function(event) {
        let index = this.data.classic.index;
        classic._onNext(index, (data => {
            //如果传过来的data不是空的话
            if (data) {
                //调用like更新的函数
                this.getnew(data.data.id, data.data.type);
                this.setData({
                    //设置值
                    classic: data.data,
                    leftfrist: classic.isLeft(data.data.index),
                    rightlast: classic.isRight(data.data.index)
                })
            } else {
                console.log('我是传来的打印')
            }
        }))

    },

    //右边的点击事件
    onright: function(event) {
        let index = this.data.classic.index;
        //固定的样刊可以选择这种方法,但是当样刊是动态变动的就会有问题
        //维护起来成本非常高
        // let rightlast = this.data.rightlast;
        // let leftfrist = this.data.leftfrist;
        classic._onPreviosu(index, (data => {
            //如果传过来的data不是空的话
            if (data) {
                this.getnew(data.data.id, data.data.type);
                this.setData({
                    //设置值
                    classic: data.data,
                    leftfrist: classic.isLeft(data.data.index),
                    rightlast: classic.isRight(data.data.index)
                })
            } else {
                console.log('我是传来的打印')
            }
        }))

    },

    //获取当前最新的点赞状态,调用一次,更新一次
    getnew: function(id, type) {
        likesModel.getNewlike(id, type, (datas => {
            this.setData({
                likeNum: datas.data.fav_nums,
                likeType: datas.data.like_status
            })
        }))
    },
})