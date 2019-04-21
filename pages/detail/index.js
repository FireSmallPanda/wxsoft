//index.js
const app = getApp()
Page({
  data:{
    name:"",
    appData: app.globalData.host,
    homeData: "空的"
  },
  onLoad: function (options) {
    this.setData({
      name:options.name,
      homeData: wx.getStorageSync("home")
    })
    console.log(options)
  }
})
