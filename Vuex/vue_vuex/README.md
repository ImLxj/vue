## Vuex

#### 1、state

​	在store中定义数据，在组件中直接使用：

​	目录：`store/index.js`

```js
export default new Vuex.Store({
  // state相当于组件中的data,专门用来存放全局的数据的
  state: {
    num: 0
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
```

目录：`HomeView.vue`

```html
<template>
  <div class="home">我是home的数字:{{ num }}</div>
</template>

<script>
export default {
  data() {
    return {
      num: this.$store.state.num
    }
  }
}
</script>
```

或者写为：

```html
<template>
  <div class="about">我是about的数字:{{ num }}</div>
</template>
<script>
export default {
  name: 'AboutView',
  computed: {
    num() {
      return this.$store.state.num
    }
  }
}
</script>
```

#### 2、getters

将组件中重复使用统一的computed处理的数据，就可以放到getters这个配置对象里面来操作。这样可以省略很多冗余的代码。

目录：`store/index.js`

```js
export default new Vuex.Store({
  // state相当于组件中的data,专门用来存放全局的数据的
  state: {
    num: 0
  },
  // getters相当于组件中的computed，但是getters是全局的，而computed是组件内部使用的
  getters: {
    // 默认有个参数，这个参数就是state
    getNum(state) {
      return state.num
    }
  },
  mutations: {},
  actions: {},
  modules: {}
})
```

目录：`AboutView.vue`

```html
<template>
  <div class="about">我是about的数字:{{ $store.getters.getNum }}</div>
</template>
<script>
export default {
  name: 'AboutView'
}
</script>
```

#### 3、 mutations

更改Vuex中的store是通过提交mutations来实现的。

目录：`store/index.js`

```js
export default new Vuex.Store({
  // state相当于组件中的data,专门用来存放全局的数据的
  state: {
    num: 0
  },
  // getters相当于组件中的computed，但是getters是全局的，而computed是组件内部使用的
  getters: {
    // 默认有个参数，这个参数就是state
    getNum(state) {
      return state.num
    }
  },
  // mutations相当于组件里面的methods，但是他不能处理异步操作
  mutations: {
    // 传入参数第一个参数是在store要操作的数据对象state,
    // payload是一个形参，当通过commit传入实参之后他就会存在，如果没有传入形参他就是undefined
    add(state, payload) {
      state.num += payload === 'undefined' ? 1 : payload
    }
  },
  actions: {},
  modules: {}
})
```

目录：`Btn.vue`

```html
<template>
  <div>
    <button @click="sumNum">点击加一</button>
  </div>
</template>

<script>
export default {
  methods: {
    sumNum() {
      // 调用store中mutations里的add方法，是通过commit提交修改操作
      // commit还可以在调用的方法之后传递参数payload
      this.$store.commit('add', 3)
    }
  }
}
</script>

<style></style>

```

#### 4、actions

是用来处理异步操作的，在组件里面想要触发actions必须通过dispatch方法来触发。真正修改数据还是通过mutations来修改。

目录：`store/index.js`

```js
export default new Vuex.Store({
  // state相当于组件中的data,专门用来存放全局的数据的
  state: {
    num: 0
  },
  // getters相当于组件中的computed，但是getters是全局的，而computed是组件内部使用的
  getters: {
    // 默认有个参数，这个参数就是state
    getNum(state) {
      return state.num
    }
  },
  // mutations相当于组件里面的methods，但是他不能处理异步操作
  mutations: {
    // 传入参数第一个参数是在store要操作的数据对象state,
    // payload是一个形参，当通过commit传入实参之后他就会存在，如果没有传入形参他就是undefined
    add(state, payload) {
      state.num += payload === 'undefined' ? 1 : payload
    }
  },
  // actions用来处理异步操作，实际的数据修改还是通过mutations来操作的，想要触发actions需要dispatch他来触发
  actions: {
    // 他需要接收一个和store实例一样的参数为context对象
    reduce(context) {
      // 隔一秒加一
      setTimeout(() => {
        context.commit('add', 1)
      }, 1000)
    }
  },
  modules: {}
})
```

目录：`Btn.vue`

```html
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
```

