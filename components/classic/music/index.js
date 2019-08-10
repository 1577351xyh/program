// components/classic/music/index.js
import {
    classicBeh
} from '../claasic-brh.js'

//创建一个音乐管理实例对象
const mMgr = wx.getBackgroundAudioManager();

Component({
    //公用属性
    behaviors: [classicBeh],
    /**
     * 页面的初始数据
     */
    properties: {
        src: {
            type: String
        },
        title: {
            type: String,
            value: '1111'
        }
    },
    data: {
        // imgicon: './images/音乐。@2x.png',
        // paly: './images/播放.png',
        // stop: './images/暂停.png',
        // playing:false
       
    },
    // methods: {
        //点击音乐播放
    //     onplay(event) {
    //         //如果没有播放
    //         let playing = this.data.playing;
    //         if (!this.data.playing) {
    //             this.setData({
    //                 playing: true
    //             })
    //             //设置播放路径和音乐的标题
    //             wx.playBackgroundAudio({
    //                 dataUrl: this.properties.src,
    //                 title: this.properties.title,
    //             })
    //         }else{
    //             this.setData({
    //                 playing: false
    //             })
    //             wx.stopBackgroundAudio();
    //         }

    //     },
    //     //当用户点击进入当前的组件
    //     //判断当前的音乐是否播放,解决不同组件切换的时候,播放状态bug
    //     _Swich:function(){
    //         //如果当前正在播放
    //         if (mMgr.paused){
    //             this.setData({
    //                 playing: false
    //             })
    //             return;
    //         }
    //         if (this.properties.src == mMgr.src){
    //             this.setData({
    //                 playing:true
    //             })
    //         }
    //     },
    //     //当播放状态和控制台一致,需要启用监听事件
    //     _Swichkongzhitai:function(){
    //         //监听当前的播放时间
    //         mMgr.onPlay(()=>{
    //             this._Swich();
    //         })
    //         //监听暂停事件
    //         mMgr.onPause(()=> {
    //             this._Swich();
    //         })
    //         //监听自然播放结束
    //         mMgr.onEnded(()=>{
    //             this._Swich();
    //         })
    //         //监听背景音乐停止事件
    //         mMgr.onStop(()=>{
    //             this._Swich();
    //         })
    //     }
    // },
    // attached: function () {
    //     // 在组件实例进入页面节点树时执行
    //     this._Swichkongzhitai();
    //     this._Swich();
    // },
    // detached:function(){
    //     // wx.stopBackgroundAudio();
    // },

})