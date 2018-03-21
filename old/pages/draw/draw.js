// pages/draw/draw.js
let ctx;

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ctx = wx.createCanvasContext('cv');

    ctx.setLineCap('round');
    ctx.setLineJoin('round');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  touchStartHandler(e) {
    const touch = e.touches[0];

    ctx.moveTo(touch.x, touch.y);

  },
  touchMoveHandler(e) {
    const touch = e.touches[0];

    ctx.lineTo(touch.x, touch.y);
    ctx.stroke();

    ctx.draw(true);

    ctx.moveTo(touch.x, touch.y);
  },

  widthChangeHandler(e) {
    ctx.setLineWidth(e.detail.value);
  },
  changeColor(e) {
    ctx.setStrokeStyle(e.currentTarget.dataset.color);
  },

  exportHandler() {
    wx.canvasToTempFilePath({
      canvasId: 'cv',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            wx.showToast({
              title: '保存成功',
            })
          },
        })
      },
    })
  }
})