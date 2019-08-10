import {HTTP} from '../http/http.js'

//继承http的方法
class ClassicModel extends HTTP{
    //获取最新的样刊,页面加载的时候
  getlatest(callback){
    this.request({
      url: 'classic/latest',
      success: (data) => {
       callback(data);
       //把最新期刊加载的key存入
       let key = this._name(data.data.index);
       //设置本地存储,把当前最新的的key存入一个data
       wx.setStorageSync(key,data);
       //把当前的index传入方法,方法会根据传入的最新期刊的index,在缓存中设置一个当前的最新期刊对应的index值
       this._setindex(data.data.index);
      }
    })
  }
  
  //获取上一期的样刊
//   getnext(index,callback){
//       this.request({
//           url: 'classic/' + index +'/previous',
//           success: (data) => {
//               callback(data);
//               console.log(data);
//               //最终是被ClassicModel所调用
//               this.getindex(data.data.index);
//               console.log(this)
//           }
//       }) 
//   }

  //判断右边是不是最后一张
  isLeft(index){
      return index == 1?true:false;
  }
  //判断左边是不是最后一张
  isRight(index){
      //把当前的样刊的index存起来,判断当前点击的index和存起来的index是不是一样的
      //如果是一样的说明右边还不是最后一张,当点击到最后一张的时候
    //   let indexs = this.getindex();
    //   console.log(this)
    //   console.log(indexs)
    //   return indexs == index? true : false;

      //读取当前页面的中的缓存名称
      let key = this._name('latest-'+ index)
      //拿缓存数据
      let latestEpsoide = wx.getStorageSync(key);
      //如果缓存不为空的话
      if (latestEpsoide){
        //   拿当前的index跟缓存中的index做比较,缓存中只有最新期刊的key
          if (index == latestEpsoide){
              return true;
          }
      }else{
          return false;
      }
  }
    // 1.点击右边按钮
    //1.如果有缓存,就读取缓存
    //2.如果没有缓存,就发送请求
    _onPreviosu(index, callback){
      this._getClassic(index, 'previous', callback)
  }     
    // 2.点击左边按钮 
    //1.如果有缓存,就读取缓存
    //2.如果没有缓存,就发送请求
    _onNext(index, callback){
      this._getClassic(index, 'next', callback)
  }
 
  /**
   * 1.根据当前的点击在缓存中读取数据,如有有,就直接读取缓存,如果没有就发送请求并加入缓存
   * 接收参数:
   * 1.index
   * 2.点击的name
   * 3.callback
   * */
    _getClassic(index,name,callback){
        // 1.key的名字,如果是向左名字就是class拼接index+1,否则就是减1
        // let key = name == 'next' ? 'classic' + (index + 1) : 'classic'+ (index-1);
        let key = name == 'next' ? this._name(index + 1) : this._name(index-1);
        //取出本地的缓存数据
        let classic = wx.getStorageSync(key);
        //如果取出来的数据是undefined
        if(!classic){
            //发送请求
            this.request({
                url:'classic/'+ index + '/'+ name,
                success:(data=>{
                    //请求成功后
                    //1.记录当前写入的数据名称
                    let key = this._name(data.data.index);
                    //2.写入数据
                    wx.setStorageSync(key,data)
                    //3.把data作为参数传入
                    callback(data)
                })
            })
            //如果取出来的不是空,就直接把取出来的classic数据传入
        }else{
            callback(classic)
        }
    }

  //根据当前传入的index ,返回一个classic-index结构的key
    _name(keyname){
      let key = 'classic' + '-' + keyname;
      return key;
    }
    //根据传入的最新期刊的index,在缓存中设置一个当前的最新期刊对应的index值
    _setindex(index){   
        let key = this._name('latest-'+index);
        //设置key中的index
        wx.setStorageSync(key, index)
    }

    //获取用户喜欢的书刊
    getMyFavor(callback){
        this.request({
            url:"classic/favor",
            success:(res=>{
                callback(res);
            })
        })
    }

}
// 暴露
export {
  ClassicModel
};