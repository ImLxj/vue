<template>
  <div class="home">
    我是home的数字:{{ num }}
    <h2>{{ $store.state.users.username }}</h2>
    <button @click="changeName('猪八戒')">点击我修改名字</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['num'])
  },
  methods: {
    // 当使用modules来定义子模块的时候子模块里面的路径和主模块的不一样
    // 因为使用了命名空间吧子模块的路径改变了。要是没使用的话如果设置了getter或者mutation就会提示重复的xxxxx
    ...mapMutations({
      changeName: 'users/changeName'
    })
  }
}
</script>
