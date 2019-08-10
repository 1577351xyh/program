// components/centent/index.js
Component({

    properties: {
        last:{
            type:Boolean
        },
        frist:{
            type: Boolean
        },
        centent:{
            type:String
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        imgleft:'./images/triangle.dis@left.png',
        imgsleft:'./images/triangle@left.png',
        imgright:'./images/triangle.dis@right.png',
        imgsright:'./images/triangle@right.png'

    },
    methods:{
        leftclick:function(){
            if (!this.properties.last){
                //向父子件传方法
                this.triggerEvent('left', {
                    left: this.data.last
                })
            }
        },
        rightclick:function(){
            if(!this.properties.frist){
                this.triggerEvent('right', {
                    right: this.data.frist
                })
            }
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})