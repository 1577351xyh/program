//这个就相当于组件共用的一些属性,可以先理解为vuex
//子组件可以继承这个的方法
let classicBeh = Behavior({
    properties:{
        img:String,
        centent:String
    },
    attached:function(){

    },
    data:{

    },
    methods:{

    }
})

export {classicBeh}