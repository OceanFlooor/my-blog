# 虚拟 DOM 与 DOM Diff

## 虚拟 DOM

### 是什么？

顾名思义，虚拟 DOM 就是非真实的 DOM，它是用于表示真实 DOM 的一个 JS 对象。

例如，下面这一段 html 表示的 dom 节点

```html
<div class="title">
  <span>Hello Raven</span>
  <ul>
    <li>苹果</li>
    <li>橘子</li>
  </ul>
</div>
```

它们在 React 中用虚拟 dom 则可能会表示为如下：

```javascript
const VitrualDom = {
  type: "div",
  props: { class: "title" },
  children: [
    { type: "span", children: "Hello Raven" },
    {
      type: "ul",
      children: [
        { type: "ul", children: "苹果" },
        { type: "ul", children: "橘子" }
      ]
    }
  ]
}
```

总之就是一句话：虚拟 DOM 是一个用于表示 DOM 的 JS 对象！

### 对于 DOM 的几点澄清

1. 原生 DOM 操作不慢

   经常都能听到类似于“DOM 操作慢”的谣言，其实 DOM 操作不慢，只是相对于原生 JS 的 API 而言慢，因为 DOM 操作涉及跨线程通信

2. 基于虚拟 DOM 的库都不可能比原生 DOM 快

   没有一个库会说他们比原生 DOM 快！React、Vue 也没说过！

### 虚拟 DOM 优点

某些情况下，虚拟 DOM 确实比 DOM 快，因为：

1. 虚拟 DOM 可减少 DOM 操作次数

   - 虚拟 DOM 把短时间内的所有 DOM 操作合并为一次，然后批量进行
   - 借助 DOM Diff 算法可以把一些不必要的 DOM 操作省略

2. 虚拟 DOM 可以跨平台展示

   因为虚拟 DOM 实际上就是一个 JS 对象，所以它可以在不同的平台下转换成不同的样子。

### 虚拟 DOM 缺点

由于是 JS 对象而非原生 DOM，所以需要依赖创建函数去创建，例如 React 中的`createElement`。

为了简化虚拟 DOM 创建的代码，React 引入了 JSX，Vue 引入了模板语法`template`，但是代价都是导致它们严重依赖打包工具。

JSX 需要`babel-loader`编译，template 需要`vue-loader`编译，所以开发中常常需要 webpack。

## DOM Diff

一种算法，它是一个能够对比新旧 vNodeTree，并返回需要进行的 DOM 操作的函数。

类似于如下：

```javascript
const patch = (oldVNode, newVNode) => {
  return [
    // 一些必要的DOM操作
  ]
}
const patches = patch(oldVNode, newVNode)
```

diff 算法在比较同级节点是可能会出现 bug，所以 Vue 以及 React 中列表渲染官方要求要加上 key
