//comment.js
var interfaces = {
  comment: '../../json/comment.js',
  uploadFile: '../../json/uploadFile.js'
};
Page({
  data: {
    imageList: [],
    uploading: false
  },
  addImage() {
    let that = this;
    this.setData({
      uploading: true
    })
    wx.chooseImage({
      count: 3, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var filePaths = that.data.imageList.concat(tempFilePaths);
        that.setData({
          imageList: filePaths
        })
      },
      complete: function (res) {
        that.setData({
          uploading: false
        })
      }
    })
  },
  deleteImage(e) {
    let delSrc = e.currentTarget.dataset.src;
    let imageList = this.data.imageList;
    imageList.splice(imageList.indexOf(delSrc), 1);
    this.setData({
      imageList: imageList
    });
  },
  formSubmit(e) {
    console.log(e.detail.value);
    let data = e.detail.value;
    if (!data.content.length) {
      wx.showModal({
        title: '说点什么吧',
        showCancel: false
      })
      return;
    }
    let imageList = this.data.imageList;
    if (!this.data.uploading && imageList.length) {
      imageList.forEach(item => {
        wx.uploadFile({
          url: interfaces.uploadFile,
          filePath: item,
          name:'file',
          // header: {}, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function(res){
            // success
          },
          fail: function() {
            wx.showModal({
              title: '上传图片失败',
              showCancel: false
            })
            return;
          },
          complete: function() {
            // complete
          }
        })
      })
    }
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
    return;
    
    wx.request({
      url: interfaces.comment,
      data: {
        score: data.score,
        content: data.content,
        images: imageList
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.showModal({
          title: '提交成功',
          showCancel: false
        })
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
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
      }
    })
    

  },
  onLoad: function () {
  }
})
