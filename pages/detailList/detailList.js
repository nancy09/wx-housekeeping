// detailList.js
//获取应用实例
var interfaces = {
  detailList: '../../json/detailList.js'
};
Page({
  data: {
    detailList: [],
    pageNum: 1
  },
  checkboxChange(e) {
    console.log(e.detail.dataset.id);
    console.log(e.currentTarget.dataset.checked);
    e.currentTarget.dataset.checked = !e.currentTarget.dataset.checked;
    console.log(e.currentTarget.dataset.checked);
  },
  onReachBottom: function () {
    this.data.pageNum++;
    this.reqData();
    console.log(this.data.pageNum);
  },
  onPullDownRefresh: function () {
    var that = this;
    that.data.pageNum = 1;
    that.reqData();
  },
  reqData() {
    var that = this;
    console.log("第" + this.data.pageNum + '页');
    if (that.data.detailList.length < 1) {
      wx.showToast({
        title: '正在加载中',
        icon: 'loading',
        duration: 500
      })
    } else {
      //在标题栏中显示加载
      wx.showNavigationBarLoading();
    }
    // wx.request({
    //   url: interfaces.detailList,
    //   data: {
    //       // uid: 0,
    //       page: that.data.pageNum
    //   },
    //   method: 'GET',
    //   success: function (res) {
    var res = require(interfaces.detailList);
    //停止下拉刷新
    wx.stopPullDownRefresh();

    if (that.data.pageNum == 1) {
      that.data.detailList = []
    }

    var detailList = res.data;
    console.log(detailList.length);
    that.setData({
      detailList: detailList,
      loading: true
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
    console.log('onLoad');
    // wx.setNavigationBarTitle({
    //     title: '服务下单'
    // })
    // wx.showToast({
    //   title: '正在加载中',
    //   icon: 'loading',
    //   duration: 500
    // })
  },
  onShow: function () {
    console.log('onShow');
    var that = this;
    that.reqData();
  },
  onShareAppMessage: function () {
    return {
      title: '附近家政服务',
      path: '/pages/index/index'
    }
  }
})