//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    contentList: []
  },
  onLoad: function (options) {
    console.log(options)
    this.getDataList()
  },
  callPhone(){
    wx.makePhoneCall({
      phoneNumber: '13107721069' // 仅为示例，并非真实的电话号码
    })
  },
  getDataList(){
    wx.request({
      url: 'https://www.woheyun.com/api/cgwas/systemAction/getSystemDicts.json', //仅为示例，并非真实的接口地址
      success:  (res)=> {
        this.setData({
          contentList: res.data.data
        })
      }
    })
  },
  copyData(data){
    if (wx.setClipboardData){
      wx.setClipboardData({
        data: data.currentTarget.dataset.text,
        success(res) {
          wx.showModal({
            title: '成功',
            content: '您选取的内容复制成功！',
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '您的微信版本过低请升级！'
      })
    }
   
  }
})
