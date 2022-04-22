<template>
  <div>
    <button @click="sumNum">点击加一</button>
    <button @click="sum">隔一秒加一</button></button>
  </div>
</template>

<script>
export default {
  methods: {
    sumNum() {
      // 调用store中mutations里的add方法，是通过commit来调用的
      // commit还可以在调用的方法之后传递参数payload
      this.$store.commit('add', 3)
    },
    sum() {
      // 想要触发actions必须通过dispatch来触发
      this.$store.dispatch('reduce')
    }
  }
}
</script>

<style></style>
