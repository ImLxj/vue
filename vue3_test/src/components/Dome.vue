<template>
  <div>
    <h2>{{ msg }}</h2>
    <button @click="text1">点我激活事件</button>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Dome',
  props: ['msg'],
  emits: ['hello'],
  // setup会接受两个参数，第一个参数是props就是父组件向子组件传递的参数
  // 第二个参数context上下文对象。里面有emits(自定义事件)和slot(插槽)
  setup(props, context) {
    console.log('我是父组件传递的参数props:', props)
    console.log(context.attrs) // 与vue2的$attrs相似
    console.log(context.emit) // 触发自定义事件的
    console.log(context.slots) // 存放着父组件个子组件传递的虚拟DOM 需要子组件留出插槽的槽位
    function text1() {
      // 触发自定义事件
      context.emit('hello', 6666)
    }
    return {
      text1
    }
  }
}
</script>

<style></style>
