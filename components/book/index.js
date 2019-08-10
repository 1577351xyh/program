// components/book/index.js
Component({
    properties:{
        book:{
            type:Object
        },
        showLike: {
            type: Boolean,
            value: true
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        title: String,
        author: String,
        img: String
    },
    methods:{
        onTap(event){
            const id = this.properties.book.id;
            wx.navigateTo({
                url: `/pages/bookinfo/bookinfo?id=${id}`,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //去api读取数据,读取数据后通过setData把数据加载到array
    },

 
})