// store里面的index.js是用来状态管理的
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
