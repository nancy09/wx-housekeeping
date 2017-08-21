// userInfo.js
var app = getApp()
let interfaces = {
  userInfo: '../../json/userInfo.js'
}
Page({
  data: {
    userInfo: {},
    name: '',
    sex: '0',
    phone: '',
    address: '',
    intro: ''
  },
  sexChange(e) {
    console.log(e.detail.value);
    this.setData({
      sex: e.detail.value
    })
  },
  reqData() {
    var that = this;
    // wx.request({
    //   url: interfaces.userInfo,
    //   data: {
    //       // uid: 0,
    //   },
    //   method: 'GET',
    //   success: function (res) {
    var res = require(interfaces.userInfo);
    var data = res.data;
    that.setData({
      name: data.name || that.data.userInfo.nickName,
      sex: data.sex || '0',
      phone: data.phone || '',
      address: data.address || '',
      intro: data.intro || ''
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
  formSubmit(e) {
    console.log(e.detail.value)
    let data = e.detail.value;
  },
  onLoad: function () {
    let that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    this.reqData();
  }
})