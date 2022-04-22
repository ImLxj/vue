export default {
  // 传入参数第一个参数是在store要操作的数据对象state,
  // payload是一个形参，当通过commit传入实参之后他就会存在，如果没有传入形参他就是undefined，要注意的是这个undefined不是字符串
  add(state, payload) {
    state.num += payload === undefined ? 1 : payload
  }
}
