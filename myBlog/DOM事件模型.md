# DOM事件模型

DOM的事件模型主要有两个常见的类型：事件捕获和事件冒泡。

## 事件流

一个DOM事件触发，是根据一个事件流来控制的。

当事件触发，事件流就会从顶层元素`document`开始往下寻找监听了相关事件的元素，这个过程叫做“捕获阶段”；

当到达触发事件的目标`event.target`之后，结束捕获，进入“目标阶段”；

目标阶段执行目标监听事件的回调函数之后返回并结束“目标阶段”；

返回，向上寻找监听相关事件的元素，这个过程叫做“冒泡阶段”；

最后回到出发点`document`，事件流结束

<img src="./img/eventFlow.png" width="500">

## 捕获和冒泡

给元素添加一个事件监听的方法常用的是`addEventListener(eventType, cb, bool)`，每次触发了相关事件，都会有一个事件流开始，事件流到达监听事件的元素的时候，可以根据代码选择在捕获或者冒泡阶段触发回调函数`cb`。

如果`bool`为falsy值，`cb`在冒泡阶段执行，反之在捕获阶段。`bool`默认为false。

另外，`cb`接收一个事件对象的参数，这个参数包含了许多有关事件和元素的信息。

事件流的捕获阶段不可被取消，但是冒泡阶段可以：

```javascript
element.addEventListener(eventType, (e) =>) {
  e.stopPropagation  // 阻止事件流继续冒泡
}
```

通常来说，如果一个元素在捕获和冒泡阶段都监听了同样的事件，回调函数分别为`f1`，`f2`，根据事件流的顺序，`f1`会先于`f2`执行，但也有例外。

如果一个元素`div1`，在捕获和冒泡阶段都监听了同样的`click`事件：

```javascript
var phases = {
  1: 'capture',
  2: 'target',
  3: 'bubble'
};

function callback(e) {
  var phase = phases[e.eventPhase];
  console.log("'. EventPhase: '" + phase + "'");
}

div1.addEventListener('click', (e) => {
  console.log('bubble')
  callback(e)
})

div1.addEventListener('click', (e) => {
  console.log('capture')
  callback(e)
}, true)

// bubble
// '. EventPhase: 'target'
// capture
// '. EventPhase: 'target'
```

[代码预览](http://js.jirengu.com/zefog/2/edit?html,js)

并且点击事件是由div1触发，那么实际上这两个监听的回调函数都只会在目标阶段触发，并且是谁先定义，谁先执行。

## 事件的代理

由于事件会在冒泡阶段向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理（delegation）。

```javascript
var ul = document.querySelector('ul');

ul.addEventListener('click', function (event) {
  if (event.target.tagName.toLowerCase() === 'li') {
    // some code
  }
});
```

上面代码中，`click`事件的监听函数定义在`<ul>`节点，但是实际上，它处理的是子节点`<li>`的`click`事件。这样做的好处是，只要定义一个监听函数，就能处理多个子节点的事件，而不用在每个`<li>`节点上定义监听函数。而且以后再添加子节点，监听函数依然有效。

如果希望事件到某个节点为止，不再传播，可以使用事件对象的`stopPropagation`方法。

## 事件代理方法封装

要求实现一个函数`on(eventType, ele, selector, cb)`，当运行`on('click', '#test', 'li', cb)`，实现`#test`元素代理`li`的点击事件

### 思路一：判断点击元素是否匹配
```javascript
function on(eventType, ele, selector, cb) {
  if(!(ele instanceof Element)) {
    ele = document.querySelector(ele)
  }

  ele.addEventListener(eventType, (e) => {
    if(e.target.matches(selector)) { // 判断点击元素是否匹配
      cb.call(e.target, e)
    }
  })
}
```

通常情况下，以上代码可以完成事件代理方法的封装，但是有个别情况会出错：如果需被代理的元素存在一个子元素，并且该子元素铺满了整个需被代理的元素，那么上面代码处理过之后，无论你怎么点击，都不会如愿执行回调函数。这时候就需要思路二的方法。

### 思路二：遍历父元素直至找到匹配元素

对触发事件的元素`e.target`向上遍历，找到满足匹配项的父级元素。只需要对上述代码监听器的回调事件稍作修改：

```javascript
  ele.addEventListener(eventType, (e) => {
    let el = e.target

    while(!el.matches(selector)) {
      if(el === ele) {  // 向上遍历至“代理商”就不能再继续了
        el = null
        break
      }
      el = el.parentNode
    }
    el && cb.call(el, e, el)
  })
```