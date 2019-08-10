// components/like/index.js
Component({
    //自己组件的属性
    properties: {
        like: {
            type: Boolean,

        },
        num: {
            type: Number,
        }
    },
    /**
     * 页面的初始数据,公用的数据
     */
    data: {
        img1: './images/喜欢icon@2x.png',
        img2: './images/书单-详情-喜欢@2x.png'
    },

    //组件的事件处理列表
    methods: {
        typeoff: function(event) {
            //喜欢的数量
            let num = this.data.num;
            //根据当前like的状态判断是加1还是减1
            num = this.data.like ? num - 1 : num + 1;
            this.setData({
                num: num,
                like: !this.properties.like
            })
            //当前like组件的状态
            let behavier = this.properties.like ? 'like' : 'cancel'
            //激活事件,把like状态传过去
            this.triggerEvent('like',{
                behavier:behavier
            },{})
        }
        //自定义事件
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },


})