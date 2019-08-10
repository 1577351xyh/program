// components/epsoide/index.js
Component({
    properties: {
        index: {
            type: String,
            //observer类似于vue中的wacth,每当这个index的值发生改变,这个ob函数就会执行
            //无限递归的原因,不断的执行ob函数
            observer:function(newVal,odlVal){
                let val = newVal < 10? '0'+ newVal : newVal;
                this.setData({
                    _index:val
                })
            }
        },
    },
    /**
     * 页面的初始数据
     */
    data: {
        arr: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月','十二月'],
        year:'',
        month:'',
        _index:''
    },
    //第一次加载的时候会执行,在attached加载后就加载onload
    attached:function(){
        let time = new Date();
        this.setData({
            year: time.getFullYear(),
            month: this.data.arr[time.getMonth()]
        })
        console.log(this.data);
    },
})