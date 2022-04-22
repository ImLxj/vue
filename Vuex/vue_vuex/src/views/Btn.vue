<template>
  <div>
    <button @click="add(2)">点击加一</button>
    <button @click="reduce(1)">隔一秒加一</button>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  methods: {
    /* sumNum() {
      // 调用store中mutations里的add方法，是通过commit来调用的
      // commit还可以在调用的方法之后传递参数payload
      this.$store.commit('add', 3)
    },
    sum() {
      // 想要触发actions必须通过dispatch来触发
      this.$store.dispatch('reduce')
    } */
    ...mapMutations(['add']),
    ...mapActions(['reduce'])
  }
}
</script>

<style></style>
