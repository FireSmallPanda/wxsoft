// pages/scan/scan.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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
          success (res) {
            that.doSaveInfo(result,res.data)
          },
          fail(res){
            that.doSaveInfo(result,null)
          }
        })
       
        console.log("result", result)
      },
      fail(res){
        console.log("res", res)
      }
    })
  },
  // 保存用户信息
  doSaveInfo(result,oldInfo) {
    // 判断用户信息
    if (!!!oldInfo) {
      oldInfo = {}
      oldInfo.name = app.globalData.userInfo.nickName
      console.log("第一次进入")
    }
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
    } else if (result.indexOf('小店码A') > -1) {
      if (!oldInfo.startTime) {
        oldInfo.startTime = new Date().getTime()
      }else{
        oldInfo.endTime = new Date().getTime()
      }
      
    } else {
      return
    }

    // 保存用户信息
    wx.setStorage({
      data: oldInfo,
      key: 'userSaveInfo',
    })
    wx.navigateBack({
      delta: 0,
    })
  }
})