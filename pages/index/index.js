//index.js
//获取应用实例
const app = getApp()
import {formatTime,getDifValue} from "../../utils/util"
Page({
  data: {
    motto: '进入扫一扫',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    startTimeString: "",
    endTimeString: "",
    useTimeString: "",
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
    if(!this.data.hasUserInfo){
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
    let startTimeString = "";
    let endTimeString = "";
    let useTimeString = "";
    if (oldInfo.startTime) {
      startTimeString = formatTime(new Date(oldInfo.startTime))
    }
    if (oldInfo.endTime) {
      endTimeString = formatTime(new Date(oldInfo.endTime))
    }
    // 计算时间差
    if (oldInfo.startTime&&oldInfo.endTime){
      useTimeString = getDifValue(oldInfo.endTime,oldInfo.startTime)
    }
    this.setData({
      startTimeString,
      endTimeString,
      useTimeString
    })
  },
  getUserInfo: function (e) {
    console.log(e)
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
    wx.navigateTo({
      url: '/pages/scan/scan',
    })
  }
})