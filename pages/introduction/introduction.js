// introduction.js
var interfaces = {
  introduction: '../../json/introduction.js'
};
Page({
  data: {
    currentTab: '0',
    phone: '',
    notice: '',
    details: '',
    score: '',
    commentCount: 0
  },
  openMap() {
    wx.openLocation({
      latitude: 23,
      longitude: 90
    })
  },
  callbtnClick() {
    let that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phone
    })
  },
  commentbtnClick() {
    wx.navigateTo({
      url: './../comment/comment'
    })
  },
  tabClick(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  reqData() {
    let that = this;
    //在标题栏中显示加载
    // wx.showNavigationBarLoading();
    // wx.request({
    //   url: interfaces.introduction,
    //   data: {
    //   },
    //   method: 'GET',
    //   success: function (res) {
    var res = require(interfaces.introduction);
    var data = res.data;
    that.setData({
      phone: data.phone,
      notice: data.notice,
      details: data.details,
      score: data.score,
      commentCount: data.commentCount
    })
    //   },
    //   fail: function () {
    //       // fail
    //       wx.showModal({
    //           title: '加载出错',
    //           showCancel: false
    //       })
    //   },
    //   complete: function () {
    //       // complete
    //       wx.hideToast();
    //       wx.hideNavigationBarLoading();
    //       //完成停止加载
    //   }
    // })
  },
  onLoad: function () {
    this.reqData();
  }
})
