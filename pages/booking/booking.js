// booking.js
var interfaces = {
  booking: '../../json/booking.js'
};
Page({
  data: {
    date: '',
    time: '',
    datetime: '',
    amount: '',
    id: '',
  },
  chooseAddress() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        console.log('address', res);
        that.setData({
          name: res.userName,
          phone: res.telNumber,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo
        })
      },
      fail(err) {
        wx.showModal({
          title: err.errMsg,
          showCancel: false
        })
      }
    })
  },
  formSubmit(e) {
    console.log(e.detail.value);
    let data = e.detail.value;
    if (!data.name.length) {
      wx.showModal({
        title: '姓名不能为空',
        showCancel: false
      })
      return;
    }
    if (!data.phone.length) {
      wx.showModal({
        title: '电话不能为空',
        showCancel: false
      })
      return;
    }
    if (!data.address.length) {
      wx.showModal({
        title: '地址不能为空',
        showCancel: false
      })
      return;
    }

    let timeStamp = +new Date() + '';
    let nonceStr = '5K8264ILTKCH16CQ2502SI8ZNMTM67VS';
    wx.request({
      url: interfaces.booking,
      data: {
        name: data.name,
        phone: data.phone,
        datetime: data.datetime,
        address: data.address,
        notes: data.notes
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: 'prepay_id=' + res.data.prepay_id,
          signType: 'MD5',
          paySign: res.data._paySignjs,
          success: function (res) {

          },
          fail: function (res) {
            wx.showModal({
              title: '支付失败',
              showCancel: false
            })
          },
          complete: function (res) {

          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '加载出错',
          showCancel: false
        })
      },
      complete: function (res) {
        wx.hideToast();
        wx.hideNavigationBarLoading();
      }
    })
    
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
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
      detail: data.detail
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
      amount: options.amount || 0
    })
  },
  onShow: function () {
    let dateTime = this.getDateTime();
    this.setData({
      date: dateTime.date,
      time: dateTime.time
    })
  },
  getDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let time = now.getTime();
    return {
      date: year + '-' + month + '-' + day,
      time: time
    };
  },
  onShareAppMessage: function () {
    return {
      title: '附近家政服务',
      path: '/pages/index/index'
    }
  }
})