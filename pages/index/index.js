//index.js
//获取应用实例
var app = getApp()
var interfaces = {
  banner: '../../json/bannerList.js',
  service: '../../json/serviceList.js'
};
Page({
    data: {
        serviceList: [],
        bannerList: []
    },
    reqBannerData() {
        var that = this;
        // wx.request({
        //   url: interfaces.banner,
        //   data: {
        //   },
        //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        //   success: function (res) {
            // success
            var res = require(interfaces.banner);
            var bannerList = res.data;
            console.log(bannerList);   
            that.setData({
              bannerList: bannerList,
              loading:true
            })
        //   },
        //   fail: function () {
        //     // fail
        //     wx.showModal({
        //       title: '加载出错',
        //       showCancel: false
        //     })
        //   },
        //   complete: function () {
        //     // complete
        //     wx.hideToast();
        //   }
        // })
    },
    reqData() {
        var that = this;
        // wx.request({
        //   url: interfaces.service,
        //   data: {
        //       // uid: 0,
        //       page: that.data.pageNum
        //   },
        //   method: 'GET',
        //   success: function (res) {
            var res = require(interfaces.service);
            var serviceList = res.data;
            console.log(serviceList.length);
            that.setData({
              serviceList: serviceList,
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
        //   }
        // })
    },
    onLoad: function () {
        console.log('onLoad');
        // wx.setNavigationBarTitle({
        //     title: '服务下单'
        // })
        // wx.showToast({
        //     title: '正在加载中',
        //     icon: 'loading',
        //     duration: 500
        // })
        var that = this;

        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            // that.setData({
            //     userInfo: userInfo
            // })
            console.log(userInfo);
        });
        var that = this;
        that.reqBannerData();
        that.reqData();
    },
    onShareAppMessage: function () {
        return {
            title: '附近家政服务',
            path: '/pages/index/index'
        }
    }
})