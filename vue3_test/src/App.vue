<template>
  <div>
    <dome @hello="hello" msg="你好啊">
      <span>你好</span>
    </dome>
    <Home />
  </div>
</template>

<script>
import Dome from './components/Dome.vue'
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: { Dome, Home },
  setup() {
    function hello() {
      alert('我是自定义事件')
    }
    return {
      hello
    }
  }
}
</script>
