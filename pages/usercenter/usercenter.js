//usercenter.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    orderShow: false,
    commentShow: false
  },
  userInfoClick() {
    wx.navigateTo({
      url: './../userInfo/userInfo'
    })
  },
  syncClick() {

  },
  orderItemClick: function() {
    let orderShow = this.data.orderShow;
    this.setData({
      orderShow: !orderShow
    })
  },
  commentItemClick: function() {
    let commentShow = this.data.commentShow;
    this.setData({
      commentShow: !commentShow
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  }
})
