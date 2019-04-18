//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList:[ // 列表
      {
        title:'1111',desc:'品苏打'
      },
      {
        title: '222', desc: '品苏打1212'
      },
      {
        title: '333', desc: '品苏打313121'
      },
    ]
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
  }
})
