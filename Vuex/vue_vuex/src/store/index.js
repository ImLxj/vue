// store里面的index.js是用来状态管理的
import Vue from 'vue'
import Vuex from 'vuex'

// 导入不同的配置项
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// 导入子模块
import users from '../store/users/index.js'

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
  // 主模块
  modules: {
    users
  }
})
