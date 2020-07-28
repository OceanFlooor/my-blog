# 浅析 MVC
MVC是一种项目代码结构的设计模式，当项目庞大起来的时候，需要一套设计理念去布局你的代码，避免代码冗余，混乱，复杂，耦合等等所带来的问题。

## MVC组成
MVC由三块组成：

  * M-model: 数据模型，专门负责数据的逻辑
  * V-view: 视图模型，专门负责视图相关的逻辑
  * C-controller: 控制模型，model和view的中间层，负责各种数据和视图之间的逻辑处理

<img src="./img/MVC.png" width="450">

## 项目中的MVC
在项目里，MVC设计模式把项目拆分成一个个模块，每个模块都有自己不同的功能，比如一个轮播图或者一个表格就可以成为一个模块。

每个模块都有自己的M、V、C三个部分，数据相关代码放在M上，视图代码存放在V上，其余的都放在C上。比如：

### Model
```javascript
const m = {
  data: {
    // ...
  },
  create() {},
  delete() {},
  update(data) {
    // ...
  },
  get() {}
}
```

### View
```javascript
const v = {
  el: null,
  html: `
  // some html code...
`,
  init() {
    // init func
  },
  render() {
    // render func
  }
}
```

### Controller

```javascript
const c = {
  init() {},
  methods: {
    // some methods
  },
  autoBindEvents() {
    // ...
  }
}
```

## EventBus
MVC涵盖的一种思维理念：把模块看作是一个对象，那么模块与模块之间要想通信，那么实际上就是对象与对象之间的事件触发，那么我们可以构造一个对象，这个对象专门用来实现对象与对象之间事件的接收和派发。

```javascript
import $ from 'jquery'

class EventBus {
  constructor() {
    this._eventBus = $(window)
  }

  // 事件监听
  on(eventName, fn) {
    return this._eventBus.on(eventName, fn)
  }

  // 事件触发
  trigger(eventName, data) {
    return this._eventBus.trigger(eventName, data)
  }

  // 事件移除
  off(eventName, fn) {
    return this._eventBus.off(eventName, fn)
  }
}
```

接着每个模块的M、V、C都去继承`EventBus`，那么每个模块事件都对外暴露了一个接口，模块与模块之间能够互相调用触发事件。

## 表驱动编程
所谓表驱动法(Table-Driven Approach)简而言之就是用查表的方法获取数据。此处的“表”通常为数组，但可视为数据库的一种体现。

考虑以下代码：
```javascript
function getDate(index) {
  let date
  if(index === 1) {
    date = '星期一'
  } else if (index === 2) {
    date = '星期二'
  } else if (index === 3) {
    date = '星期三'
  } else if (index === 4) {
    date = '星期四'
  } else if (index === 5) {
    date = '星期五'
  } else if (index === 6) {
    date = '星期六'
  } else if (index === 0) {
    date = '星期日'
  }

  return date  
}
```
你会不会觉得这坨代码很冗余，而且很不妥？如果有一万种情况呢？难道要弄一万种if else么？所以这里就需要用一张表来把所有的数据存起来，然后遍历表做对应的处理：

```javascript
let table = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
function getDate(index) {
  return table[index]
}
```

## 模块化思想
模块化思想是MVC的思想的根基。

把一个项目拆分成一个个模块，每个模块处理对应的功能，模块与模块之间互不影响，并且对外暴露出一个模块引用接口，供总文件引入并将一个个模块组装成一个完整的项目，就像拼模型一样。

这样的思想是非常值得推崇的，尤其是项目庞大起来之后，模块化能够解决代码混乱，冗余，高度耦合和难以维护等问题。