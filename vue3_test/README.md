### Vue3

#### setup的两个注意点

​	1、setup执行的时机

​			在beforeCreate之前执行一次，this是undefined。

​	2、setup的参数

​			props：值为对象，包含：组件外部传递过来，且组件内部声明接收了属性。

```js
export default {
  name: 'Dome',
  props: ['msg'],
  setup(props, context) {
    console.log('我是父组件传递的参数props:', props)
  }
}
```

​			context：上下文对象

​				attrs：值为对象，包含：组件外部传递过来，但没有在props配置中声明的属性，相当于this.$attrs。

​				slots：收到的插槽内容，相当于this.$slots。

​				emit：分发自己定义事件的函数,相当于this.$emit。