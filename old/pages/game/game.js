// pages/game/game.js

const CHOICE_LENGTH = 3;
let si;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    choice: [{
      active: true,
      value: 1,
      image: '/assets/images/stone.png',
    }, {
      active: true,
      value: 2,
      image: '/assets/images/scissors.png',
    }, {
      active: true,
      value: 3,
      image: '/assets/images/cloth.png',
    }, {
      active: false,
      value: -1,
      image: '/assets/images/question.png',
    }],

    computerChoiceIndex: 1,
    userChoiceIndex: 3,

    totalCount: 0,
    winCount: 0,
    winPercent: '0%',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'record',
      success: (res) => {

        this.setData({
          totalCount: res.data.totalCount,
          winCount: res.data.winCount,
          winPercent: this.calcWinPercent(res.data.winCount, res.data.totalCount),
        });
      },
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.startNewGame();
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

  startNewGame() {
    this.setData({
      userChoiceIndex: 3,
    });

    si = setInterval(() => {
      this.setData({
        computerChoiceIndex: (this.data.computerChoiceIndex + 1) % CHOICE_LENGTH,
      });
    }, 50);
  },

  choiceHandler(e) {
    clearInterval(si);

    this.setData({
      userChoiceIndex: e.currentTarget.dataset.index,
    });

    setTimeout(this.showResult, 400);
  },

  showResult() {
    const userChoice = this.data.choice[this.data.userChoiceIndex].value;
    const computerChoice = this.data.choice[this.data.computerChoiceIndex].value;

    console.log(userChoice, computerChoice);

    let msg = '';
    const DIFF = userChoice - computerChoice;

    this.setData({
      totalCount: this.data.totalCount + 1,
    });

    if (DIFF === 0) {
      msg = '😌居然平局😌';
    } else if (DIFF === -1 || DIFF === 2){
      msg = '😎大佬，你赢了😏';

      const finalWinCount = this.data.winCount + 1;

      this.setData({
        winCount: finalWinCount,
        winPercent: this.calcWinPercent(finalWinCount, this.data.totalCount),
      });
    } else {
      msg = '🙃弱鸡，你输了🙄';
    }

    wx.setStorage({
      key: 'record',
      data: {
        totalCount: this.data.totalCount,
        winCount: this.data.winCount,
      },
    });
    

    wx.showModal({
        title: '结果',
        content: msg,
        showCancel: false,
        success: () => {
          this.startNewGame();
        },
      });
  },


  calcWinPercent(winCount, totalCount) {
    const percentData = totalCount ? (winCount / totalCount * 100).toFixed(2) : 0;

    return `${percentData}%`;
  }
})