//logs.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    contentList: []
  },
  onLoad: function (options) {

  },
  onShow() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.loadSaveInfo()
    } else {
      wx.showToast({
        // 提示内容
        title: "请先获取用户信息",
        icon: "none",
      })
      // 让用户可以看到提示
      setTimeout(()=>{
        wx.switchTab({
          url: '../index/index'
        })
      },500)
     
    }
  },
  loadInfo(){
    
  },
  // getDataList(){
  //   wx.request({
  //     url: 'https://www.woheyun.com/api/cgwas/systemAction/getSystemDicts.json', //仅为示例，并非真实的接口地址
  //     success:  (res)=> {
  //       this.setData({
  //         contentList: res.data.data
  //       })
  //     }
  //   })
  // },
})