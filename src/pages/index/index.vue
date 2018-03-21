<template>
  <div class="container index-container">
    <button size="mini" @click="goto('/pages/game/game')">石头剪刀布</button>

    <button size="mini" @click="goto('/pages/draw/draw')">画图</button>

    <button size="mini" @click="goto('/pages/music/music')">音乐播放</button>
  </div>
</template>

<script>

export default {
  methods: {
    goto (url) {
      wx.navigateTo({
        url
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: space-between;
}
</style>
