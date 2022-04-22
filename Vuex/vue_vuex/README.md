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

#### 3、mutations

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

#### 5、辅助函数（map*）

mapState和mapGetters函数在组件当中写在computed配置对象里面的。

```html
<!--html页面-->
<template>
    <div>
        <h2>我是mapState的数据:{{num}}</h2>
   		<h2>我是mapGetters的数据:{{getNum}}</h2>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['num']),
    ...mapGetters(['getNum'])
  }
}
</script>
```

mapMutatins和mapActions函数都是写在组件的methods配置对象里面。

```html
<template>
	<div>
        <button @click="add(1)">点我累加</button>
        <button @click="reduce(1)">点我延时累加</button>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  methods: {
    // 数组里面的每一项数据就是一个响应函数对象,在用事件响应的时候事件名需要加小括号。
    // 小括号就是决定是否传入参数，如果没有小括号就会报错。
    ...mapMutations(['add']),
    ...mapActions(['reduce'])
  }
}
</script>
```

#### 6、模块化拆分写法

将state、getters、mutations、actions分别拆分成不同的js文件，然后暴露出来导入到`store/index.js`里面。

目录：`store/state.js`

```js
export default {
  num: 0
}
```

目录：`store/getters.js`

```js
export default {
  // 默认有个参数，这个参数就是state
  getNum(state) {
    return state.num
  }
}
```

目录：`store/mutations`

```js
export default {
  // 传入参数第一个参数是在store要操作的数据对象state,
  // payload是一个形参，当通过commit传入实参之后他就会存在，如果没有传入形参他就是undefined，要注意的是这个undefined不是字符串
  add(state, payload) {
    state.num += payload === undefined ? 1 : payload
  }
}
```

目录：`store/actions`

```js
export default {
  // 他需要接收一个和store实例一样的参数为context对象
  reduce(context) {
    // 隔一秒加一
    setTimeout(() => {
      context.commit('add')
    }, 1000)
  }
}
```

需要将所有的`js`文件导入到`store/index.js`里面。

目录：`store/index.js`

```js
// store里面的index.js是用来状态管理的
import Vue from 'vue'
import Vuex from 'vuex'

// 导入不同的配置项
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  // state相当于组件中的data,专门用来存放全局的数据的
  state,
  // getters相当于组件中的computed，但是getters是全局的，而computed是组件内部使用的
  getters,
  // mutations相当于组件里面的methods，但是他不能处理异步操作
  mutations,
  // actions用来处理异步操作，实际的数据修改还是通过mutations来操作的，想要触发actions需要dispatch他来触发
  actions,
  modules: {}
})

```

#### 7、modules

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。

如拆分一个用户数据，这个用户数据方式和6中模块化拆分写法一样，就是子模块当中如果要定义一个新的getter和mutation就需要加一个命名空间的属性，如果不加命名空间的属性，则会提示重复的getter或mutation。

目录：`store/users/index.js`

```js
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default {
  namespaced: true, // 命名空间
  state,
  getters,
  mutations,
  actions,
  modules: {}
}
```

在主模块当中把users文件里面的index.js导入进去即可获取到users里面的数据。

```js
// 导入子模块
import users from '../store/users/index.js'

// 主模块
modules: {
   users
}
```

在组件中获取数据的方法:

```js
$store.state.users.username
```

在组件中触发mutations的方法：

```js
 methods: {
    // 当使用modules来定义子模块的时候子模块里面的路径和主模块的不一样
    // 因为使用了命名空间吧子模块的路径改变了。要是没使用的话如果设置了getter或者mutation就会提示重复的xxxxx
    ...mapMutations({
      changeName: 'users/changeName'
    })
  }
```

