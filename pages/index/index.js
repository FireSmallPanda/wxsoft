//index.js
//获取应用实例
const app = getApp()
import {
  formatTime,
  getDifValue
} from "../../utils/util"
import {
  matchPrice,
  typesDict
} from "../../utils/cash"

Page({
  data: {
    motto: '扫一扫',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    startTimeString: "",
    endTimeString: "",
    useTimeString: "",
    timeList: [],
    dialogShow: false,
    typesDict: typesDict,
    current:'A'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          // 获取当前用户信息

          this.getInfo()
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function () {
    this.getInfo()

  },
  getInfo() {
    if (!this.data.hasUserInfo) {
      return
    }
    let that = this;
    wx.getStorage({
      key: 'userSaveInfo',
      success(res) {
        
        that.doShowInfo(res.data)
      },
      fail(res) {
        return
        //  that.doShowInfo(null)
      }
    })
  },
  
  doShowInfo(oldInfo) {
    // 判断用户信息
    if (!!!oldInfo) {
      return
    }

    if (oldInfo.startTime) {
      // 判断是不是第二天 若是第二天则从新记时
      let oldDate = new Date(oldInfo.startTime)
      let oldY = oldDate.getFullYear()
      let oldM = oldDate.getMonth() + 1
      let oldD = oldDate.getDate()
      let newDate = new Date()
      let newY = newDate.getFullYear()
      let newM = newDate.getMonth() + 1
      let newD = newDate.getDate()
      if (oldY != newY || oldM != newM || oldD != newD) {
        oldInfo = {}
        oldInfo.name = app.globalData.userInfo.nickName
        return
      }
      this.matchOutTime(oldInfo)
    }
  },
  matchOutTime(oldInfo) {
    // 消费类型
    let type = ['A', 'B']
    let saveList = []
    for (let i = 0; i < type.length; i++) {

      let item = type[i]
      let startTimeString = "";
      let endTimeString = "";
      let useTimeString = "";
      let price = "";
      let havFlag = false
      if (oldInfo['startTime' + item]) {
        startTimeString = formatTime(new Date(oldInfo['startTime' + item]))
        havFlag = true
      }
      if (oldInfo['endTime' + item]) {
        endTimeString = formatTime(new Date(oldInfo['endTime' + item]))
        havFlag = true
      }
      // 计算时间差
      if (oldInfo['startTime' + item] && oldInfo['endTime' + item]) {
        useTimeString = getDifValue(oldInfo['endTime' + item], oldInfo['startTime' + item])
        price = matchPrice(null, item, oldInfo['endTime' + item] - oldInfo['startTime' + item])
        havFlag = true
      }
      // 加入时间集合
      if (havFlag) {
        // 查询匹配的套餐
        let findTypeObj = typesDict.find(typeItem => typeItem.name === item)
        let timeItem = {
          type: item,
          startTimeString,
          endTimeString,
          useTimeString,
          price,
          typeName: findTypeObj.value
        }
        saveList.push(timeItem)
      }
    }
    console.log('saveList' + saveList)
    this.setData({
      timeList: saveList
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    this.getInfo()
  },
  toScan() {
    if (!app.globalData.userInfo) {
      wx.showToast({
        // 提示内容
        title: "请先获取用户信息",
        icon: "none",
      })
      return
    }
    this.openSan()
  },
  // 打开扫一扫
  openSan() {
    let that = this
    // 允许从相机和相册扫码
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        wx.getStorage({
          key: 'userSaveInfo',
          success(res) {
            that.doSaveInfo(result, res.data)
          },
          fail(res) {
            that.doSaveInfo(result, null)
          }
        })

        console.log("result", result)
      },
      fail(res) {
        console.log("res", res)
      }
    })
  },
  // 保存用户信息
  doSaveInfo(result, oldInfo) {
    let that = this
    // 判断用户信息
    if (!!!oldInfo) {
      oldInfo = {}
      oldInfo.name = app.globalData.userInfo.nickName
    } else if (oldInfo.startTime) {
      // 判断是不是第二天 若是第二天则从新记时
      let oldDate = new Date(oldInfo.startTime)
      let oldY = oldDate.getFullYear()
      let oldM = oldDate.getMonth() + 1
      let oldD = oldDate.getDate()
      let newDate = new Date()
      let newY = newDate.getFullYear()
      let newM = newDate.getMonth() + 1
      let newD = newDate.getDate()
      console.log("时间" + oldY + "年" + oldM + "月" + oldD + "日")
      console.log("时间" + newY + "年" + newM + "月" + newD + "日")
      if (oldY != newY || oldM != newM || oldD != newD) {
        oldInfo = {}
        oldInfo.name = app.globalData.userInfo.nickName
      }
    }
    // 扫码开始
    
    if (result.indexOf('进入码') > -1) {
      if (oldInfo.startTime) {
        wx.showToast({
          // 提示内容
          title: "您已扫过进入码",
          icon: "none",
        })
        return
      }
      oldInfo.startTime = new Date().getTime()
    } else if (result.indexOf('出去码') > -1) {
      if (!oldInfo.startTime) {
        wx.showToast({
          // 提示内容
          title: "请先扫进入码",
          icon: "none",
        })
        return
      }
      oldInfo.endTime = new Date().getTime()
    } else if (result.indexOf('小店码') > -1) {
      let typeObj = result.split("&&")
      if (!oldInfo['startTime' + typeObj[1]]) {
        let findTypeObj = typesDict.find(typeItem => typeItem.name === typeObj[1])
        wx.showModal({
          title: '确认',
          content: '是否选择' + findTypeObj.remark,
          success(res) {
            if (res.confirm) {
              oldInfo['startTime' + typeObj[1]] = new Date().getTime()
              oldInfo.startTime = new Date().getTime()
              // 保存用户信息
              wx.setStorage({
                data: oldInfo,
                key: 'userSaveInfo',
              })
              that.getInfo()
              return
            } else if (res.cancel) {}
          }
        })

      } else {
        oldInfo['endTime' + typeObj[1]] = new Date().getTime()
      }

    }else if (result.indexOf('套餐结束') > -1) {
      let havStartTime = false 
      typesDict.forEach(typeItem=>{
        
        if( oldInfo['startTime'+typeItem.name ]){
          havStartTime = true
          
          oldInfo['endTime' + typeItem.name ] = new Date().getTime()
        }
      })
      
      if(!havStartTime){
        this.setData({
          dialogShow:true
        })
      }
    } else {
      return
    }

    // 保存用户信息
    wx.setStorage({
      data: oldInfo,
      key: 'userSaveInfo',
    })
    this.getInfo()

  },
  doClear() {
    wx.clearStorage({
      success: (res) => {
        wx.showToast({
          // 提示内容
          title: "清除缓存成功",
          icon: "none",
        })
      },
    })
  },
  listenerRadioGroup(e) {

    console.log('点击的是第' + e.detail.value + '个radio')

    this.setData({

      current: e.detail.value

    })

  },
  dialogToggle(){
     let oldInfo = {}
    oldInfo['startTime' + this.data.current] = new Date().getTime()
    oldInfo.startTime = new Date().getTime()
    // 保存用户信息
    app.globalData.userInfo = {}
    wx.setStorage({
      data: oldInfo,
      key: 'userSaveInfo',
      hasUserInfo:true,
      
    })
    this.getInfo()
    this.setData({
      dialogShow: false
    })
  }
})