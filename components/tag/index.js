// components/tag/index.js
Component({

    options:{
        multipleSlots:true
    },
    externalClasses:['tag-class'],
    properties:{
        text:{
            type:String
        }
       
    },
    methods:{
        //当标签被点击的时候
        onTap(event){
            this.triggerEvent('gettext', { 
                text: this.properties.text
             })
        },
    },
    /**
     * 页面的初始数据
     */
    data: {

    },


})