<template>
  <div class="container game-container">
    <div class="wrapper computer-wrapper">
      <span class="title">电脑</span>
      <div class="choice-box">
        <img class="choice" :src="choices[computerChoiceIndex].image" mode="widthFix" />
      </div>
    </div>

    <span class="vs">VS</span>

    <div class="wrapper user-wrapper">
      <img class="choice" :src="choices[userChoiceIndex].image" mode="widthFix" />
      <span class="title">我</span>
    </div>

    <div class="choice-wrapper">
      <img v-for="(item, index) in choices" :key="index"
          v-if="item.active"
          :src="item.image"
          mode="widthFix"
          @click="choiceHandler(index)" />
    </div>

    <div class="record">
      <span>总局数：{{totalCount}}</span>
      <span>胜率：{{winPercent}}</span>
      <span>胜局数：{{winCount}}</span>
    </div>
  </div>
</template>

<script>
const CHOICE_LENGTH = 3
let si

export default {
  data () {
    return {
      choices: [{
        active: true,
        value: 1,
        image: '/static/images/stone.png'
      }, {
        active: true,
        value: 2,
        image: '/static/images/scissors.png'
      }, {
        active: true,
        value: 3,
        image: '/static/images/cloth.png'
      }, {
        active: false,
        value: -1,
        image: '/static/images/question.png'
      }],

      computerChoiceIndex: 1,
      userChoiceIndex: 3,

      totalCount: 0,
      winCount: 0
    }
  },
  computed: {
    winPercent () {
      const percentData = this.totalCount ? (this.winCount / this.totalCount * 100).toFixed(2) : 0

      return `${percentData}%`
    }
  },
  methods: {
    startNewGame () {
      this.userChoiceIndex = 3

      si = setInterval(() => {
        this.computerChoiceIndex = (this.computerChoiceIndex + 1) % CHOICE_LENGTH
      }, 50)
    },

    choiceHandler (index) {
      clearInterval(si)

      this.userChoiceIndex = index

      setTimeout(this.showResult, 400)
    },

    showResult () {
      const userChoice = this.choices[this.userChoiceIndex].value
      const computerChoice = this.choices[this.computerChoiceIndex].value

      let msg = ''
      const DIFF = userChoice - computerChoice

      this.totalCount = this.totalCount + 1

      if (DIFF === 0) {
        msg = '😌居然平局😌'
      } else if (DIFF === -1 || DIFF === 2) {
        msg = '😎大佬，你赢了😏'

        this.winCount = this.winCount + 1
      } else {
        msg = '🙃弱鸡，你输了🙄'
      }

      wx.setStorage({
        key: 'record',
        data: {
          totalCount: this.totalCount,
          winCount: this.winCount
        }
      })

      wx.showModal({
        title: '结果',
        content: msg,
        showCancel: false,
        success: () => {
          this.startNewGame()
        }
      })
    }
  },
  created () {
    wx.getStorage({
      key: 'record',
      success: (res) => {
        this.totalCount = res.data.totalCount
        this.winCount = res.data.winCount

        this.startNewGame()
      }
    })
  }
}
</script>

<style lang="scss">
.game-container {
  text-align: center;
}

.wrapper .choice {
  width: 180rpx;
  display: block;
  margin: 0 auto;
}

.computer-wrapper .choice {
  transform: rotate(180deg);
  margin-top: 15px;
}

.user-wrapper .choice {
  margin-bottom: 15px;
}

.vs {
  display: block;
  font-size: 90rpx;
  margin: 10px 0;
}

.choice-wrapper {
  display: flex;
  justify-content: space-around;
  margin-top: 15px;

  img {
    width: 150rpx;
  }
}

.record {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 15rpx 20rpx;
  display: flex;
  justify-content: space-between;
}
</style>
