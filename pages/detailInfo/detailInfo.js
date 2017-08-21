// detailInfo.js
//获取应用实例
var interfaces = {
  detailInfo: '../../json/detailInfo.js'
};
Page({
  data: {
    detail: '',
    images: [],
    amount: 0,
    id: '',
    count: 0
  },
  sendbtnClick() {
    let that = this;
    wx.navigateTo({
      url: './../booking/booking?id=' + that.data.id,
    })
  },
  reqData() {
    var that = this;
    // wx.request({
    //   url: interfaces.detailInfo,
    //   data: {
    //       id: that.data.id
    //   },
    //   method: 'GET',
    //   success: function (res) {
    var res = require(interfaces.detailInfo);
    var data = res.data;
    let amount = data.price * that.data.count;
    that.setData({
      detail: data.detail,
      images: data.images,
      amount: amount
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
  onLoad: function (options) {
    // wx.showToast({
    //   title: '正在加载中',
    //   icon: 'loading',
    //   duration: 500
    // })
    this.setData({
      id: options.id,
      count: options.count || 1
    })
    this.reqData();
  },
  onShareAppMessage: function () {
    return {
      title: '附近家政服务',
      path: '/pages/index/index'
    }
  }
})