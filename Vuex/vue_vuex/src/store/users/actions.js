export default {
  // 他需要接收一个和store实例一样的参数为context对象
  reduce(context) {
    // 隔一秒加一
    setTimeout(() => {
      context.commit('add')
    }, 1000)
  }
}
