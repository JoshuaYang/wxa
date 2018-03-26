<template>
  <div class="container container-index">
    <button @click="goto('/pages/game/game')">石头剪刀布</button>

    <button @click="goto('/pages/draw/draw')">画图</button>
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
  button {
    margin-bottom: 10px;
  }
}
</style>
