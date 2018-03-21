<template>
  <div class="container draw-container">
    <div class="controls">
        <text>画笔设置</text>
        <slider min='1' max='10' show-value @change='widthChangeHandler'></slider>

        <div class="colors">
          <div
            v-for="(color, index) in colorList" :key="index"
            class="color"
            @click="changeColor('red')"
            :style="{backgroundColor: color}"></div>

           <button size='mini' @click='exportHandler'>导出</button>
        </div>
    </div>

    <canvas
      canvas-id='cv'
      disable-scroll
      @touchstart="touchStartHandler"
      @touchmove="touchMoveHandler" />
  </div>
</template>

<script>
let ctx

export default {
  data () {
    return {
      colorList: [
        'red',
        'yellow',
        'blue',
        'green',
        'black',
        'orange'
      ]
    }
  },
  methods: {
    touchStartHandler (e) {
      console.log('==========', e)
      // const touch = e.touches[0]

      // ctx.moveTo(touch.x, touch.y)
    },
    touchMoveHandler (e) {
      console.log('==========', e)
      // const touch = e.touches[0]
      // ctx.lineTo(touch.x, touch.y)
      // ctx.stroke()
      // ctx.draw(true)
      // ctx.moveTo(touch.x, touch.y)
    },

    widthChangeHandler (e) {
      ctx.setLineWidth(e.mp.detail.value)
    },
    changeColor (color) {
      ctx.setStrokeStyle(color)
    },

    exportHandler () {
      wx.canvasToTempFilePath({
        canvasId: 'cv',
        success (res) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success () {
              wx.showToast({
                title: '保存成功'
              })
            }
          })
        }
      })
    }
  },
  created () {
    ctx = wx.createCanvasContext('cv')

    ctx.setLineCap('round')
    ctx.setLineJoin('round')
  }
}
</script>

<style lang="scss">
page, .draw-container {
  height: 100%;
}

.controls {
  height: 20%;

  .colors {
    margin-top: 16px;

    .color {
      display: inline-block;
      margin-right: 5px;
      width: 30px;
      height: 30px;
    }
  }
}

canvas {
  width: 100%;
  height: 75%;
  margin-top: 5%;
  border: 1px solid black;
}
</style>
