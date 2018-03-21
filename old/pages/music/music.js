// pages/music/music.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchString: '',
    songList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
      data: {
      },
      success(res) {
        console.log(res.data);
      },
    });
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

  changeSearchString(e) {
    this.setData({
      searchString: e.detail.value,
    })
  },
  searchHandler() {
    wx.request({
      url: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
      data: {
        w: this.data.searchString,
        format: 'json'
      },
      success: (res) => {
        console.log(res.data.data.song.list);
        
        const songList = [];
        res.data.data.song.list.forEach((item) => {
          console.log(item);

          songList.push({
            id: item.songid,
            name: item.songname,
            mid: item.songmid,
          });
        });

        this.setData({
          songList,
        });
      }
    })
  },
})