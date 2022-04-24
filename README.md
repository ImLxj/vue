### vue的学习

#### Vue3的响应式原理

​	实现原理

​		通过Proxy(代理)：拦截对象中任意属性的变化，包括：属性值的读写、属性的添加、属性的删除等。

​		通过Reflect(反射)：对源对象的属性进项操作。

```js
let person = {
    name: '张三',
    age: 15
}

const p = new Proxy(person, {
    get(target, propName) {
        console.log(`我监听到了${propName}属性`)
        // 通过Reflect反射对象
        return Reflect(target, propName)
    },
    set(target, propName, value) {
        console.log(`我监听到了${propName}属性的修改,准备渲染页面`)
        Reflect(target, propName, value)
    },
    deleteProperty(target, propName) {
        console.log(`我监听到了${propName}属性的删除,准备渲染页面`)
        return Reflect.deleteProperty(target, propName)
    }
})
```

