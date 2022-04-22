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
