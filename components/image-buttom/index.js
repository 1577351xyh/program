// components/image-button/index.html.js
Component({
    /**
     * 组件的属性列表
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    // externalClasses: ['ex-btn-class'],
    properties: {
        openType: {
            type: String
        },
        imageSrc: {
            type: String
        },
        bindgetuserinfo: {
            type: String
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    /**
     * 组件的方法列表
     */
    methods: {
        onGetUserInfo(event) {
            //授权的信息
            console.log(event.detail)
            this.triggerEvent('getuserinfo', event.detail, {})
        },
    }
})