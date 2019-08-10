// components/search/index.js
import {
    Keyword
} from '../../model/keyword.js'
import {
    BooksModel
} from '../../model/book.js'
let keyword = new Keyword();
let books = new BooksModel();
Component({
    properties: {
        //热门搜索
        hotarr: {
            type: Object
        },
        //历史搜索
        history: {
            type: Object
        },
        //书本数组
        searchBook: {
            type: Object,
            value:[]
        },
        //控制组件show
        searchoff: {
            type: Boolean,
            value: false
        },
        //搜索组件懒加载的开关
        searchbuttom: {
            type: Boolean,
            value: true
        },
        //当前书籍的数量
        start: {
            type: Number,
            value: 0
        },
        //当前书籍的总数量
        total: {
            type: Number,
            value: 1
        },
        //监控父组件的下拉事件
        more: {
            type: String,
            observer: function() {
                //页面滚到底部
                //父组件的值改变处罚子组件的observer方法             
                //发送请求,更改searchbook的值
                //参数1:从哪里开始搜索(从当前数组的最后一个下标开始)
                //参数2:搜索的内容
                let q = this.data.q;
                let length = this.properties.searchBook.length;
                //请求的开关(避免无效请求)
                console.log(this.properties.searchbuttom)
                //如果开关为trun就可以发送请求
                if (this.properties.searchbuttom) {
                    this.properties.searchbuttom = false;
                    //当前的请求数量是否等于数组返回最大的响应数量
                    if (this.properties.start == this.properties.total || length ==0) {
                        //如果相等就不要再发送无效的请求了
                        this.properties.searchbuttom = true;
                        return;
                    } else {
                        this.loadingCenterT();
                        books.getbook(length, q)
                            .then(res => {
                                console.log('我发送了一次请求')
                                //1.拼接数组返回给searchbook
                                console.log(res)
                                let newarr = res.data.books;
                                //2.数组的拼接
                                let arr = this.properties.searchBook.concat(newarr)
                                //3.避免多次无效请求
                                this.properties.start = res.data.start;
                                this.properties.total = res.data.total;
                                //把拼接的数组传给searchBook,渲染页面
                                this.setData({
                                    searchBook: arr
                                })
                                this.loadingCenterF()
                                this.properties.searchbuttom = true;
                            })
                        }
                } else {
                    return
                }
            }
        }
    },
    /**
     * 页面的初始数据
     */
    data: {
        q: '',
        loading:false,
        loadingCenter:false,
        empty:false
    },
    //组件加载完毕
    attached: function() {
        //获取缓存历史记录
        this.setData({
            history: keyword.gethistory()
        })

    },
    methods: {
        //点击小×
        ondeletes(event) {
            this.setData({
                searchoff: false,
                empty: false
            })
           
        },
        //点击子组件取消
        ondelete(event) {
            this.triggerEvent('cancel')
            this.setData({
                empty: false
            })
        },
        //回車搜索与点击搜索
        onSearch(event) {
            //组件被点击输入的值
            //回车输入的值
            let text = event.detail.text || event.detail.value;
            //更改页面开关和vulae值双向绑定
            this.setData({
                searchoff: true,
                q: text,
                searchBook:[]
            })
            //加載
            this._loadingT();
            //获取最新的value值
            //将数据读入到缓存中(接收text读入缓存)
            keyword.sethistory(text);
            books.getbook(0, text)
                .then(res => {
                    this.setData({
                        searchoff: true,
                        searchBook: res.data.books
                    })
                    //没有加载到书籍的
                    if (this.data.searchBook.length === 0) {
                        this.setData({
                            empty: true
                        })
                    }
                    //加载开关
                    this._loadingF();
                })
        },
        //loading为turn
        _loadingT(){
            this.setData({
                loading:true
            })
        },
        //loading为false
        _loadingF(){
            this.setData({
                loading: false
            })
        },
        //懒加载loadingtrue
        loadingCenterT(){
            this.setData({
                loadingCenter: true
            })
        },
        //懒加载loadingfalse
        loadingCenterF(){
            this.setData({
                loadingCenter: false
            })
        },
        //没有加载到书籍
        _empty(){
            this.setData({
                empty:true
            })
        },
        //取消显示
        _emptyF(){
            this.setData({
                empty:false
            })
        }
    },

})