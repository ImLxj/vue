export default {
  changeName(state, payload) {
    state.username = payload === undefined ? '吴彦祖' : payload
  }
}
