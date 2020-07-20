# jQuery设计思想

看到这里可能有人就会惊讶：什么？都0202年了还学jQuery？

先别惊讶，虽然jQuery已经慢慢地在没落，最后会成为过去式，但是它留下的精华还是很值得我们去学习的。

而且jQuery是目前最古老，最长寿，活跃时间最长的JS框架，到今天2020年，全球仍超过80%的网站在使用jQuery，因为它真的牛逼。

[点击这里查看数据](https://trends.builtwith.com/javascript/jQuery)

设计思想包括：选择网页元素、改变结果集、链式操作、元素的操作、工具方法、事件操作

## 选择网页元素

jQuery极大的简化了DOM操作，因为原生DOM操作的API真的比较难用，而且思想比较反人类。

jQuery的基本设计思想和主要用法，就是"选择某个网页元素，然后对其进行某种操作"。

具体做法就是：将一个选择表达式，放进构造函数jQuery()（简写为$），然后得到被选中的元素。

`$(selector)`，`selector`可以是CSS选择器，也可以是jQuery[独有的表达式](https://api.jquery.com/category/selectors/)

```javascript
　　$('#myId') //选择ID为myId的网页元素

　　$('div.myClass') // 选择class为myClass的div元素

　　$('input[name=first]') // 选择name属性等于first的input元素

　　$('a:first') //选择网页中第一个a元素

　　$('tr:odd') //选择表格的奇数行

　　$('#myForm :input') // 选择表单中的input元素

　　$('div:visible') //选择可见的div元素

　　$('div:gt(2)') // 选择所有的div元素，除了前三个
```

## 改变结果集

提供各种[过滤器](https://api.jquery.com/category/traversing/filtering/)，对结果集进行筛选，缩小选择结果。

```javascript
　　$('div').has('p'); // 选择包含p元素的div元素

　　$('div').not('.myClass'); //选择class不等于myClass的div元素

　　$('div').filter('.myClass'); //选择class等于myClass的div元素

　　$('div').first(); //选择第1个div元素

　　$('div').eq(5); //选择第6个div元素
```

## 链式操作

选中网页元素以后，可以对它进行一系列操作，并且所有操作可以连接在一起，以链条的形式写出来:

选取所有`div`元素中的`h3`，然后选中第三个`h3`，将它的`innerHTML`设置为Hello
```javascript
    $('div').find('h3').eq(2).html('Hello')
```

这种链式调用方法十分便利，实现这个原理其实很简单，在每个方法的最后面都加一句：

```javascript
return this
```
由`this`的隐式绑定规则可知道，函数内部的`this`指向调用函数的对象，所以每次返回`this`就能确保上面代码每次操作`this`都指向`$('div')`

## 元素的操作：取值和赋值

使用同一个函数，来完成取值（getter）和赋值（setter），即"取值器"与"赋值器"合一。到底是取值还是赋值，由函数的参数决定。

这是重载思想。

```
　　.html() 取出或设置html内容

　　.text() 取出或设置text内容

　　.attr() 取出或设置某个属性的值

　　.width() 取出或设置某个元素的宽度

　　.height() 取出或设置某个元素的高度

　　.val() 取出某个表单元素的值
```

## 元素的操作：移动

提供两组方法，来操作元素在网页中的位置移动。一组方法是直接移动该元素，另一组方法是移动其他元素，使得目标元素达到我们想要的位置。

```
　　.insertAfter()和.after()：在现存元素的外部，从后面插入元素

　　.insertBefore()和.before()：在现存元素的外部，从前面插入元素

　　.appendTo()和.append()：在现存元素的内部，从后面插入元素

　　.prependTo()和.prepend()：在现存元素的内部，从前面插入元素
```

## 元素的操作：复制、删除和创建

复制元素使用.clone()

删除元素使用.remove()和.detach()

清空元素内容（但是不删除该元素）使用.empty()

创建元素使用.append(html)、$(html)

## 工具方法

除了对选中的元素进行操作以外，还提供一些与元素无关的工具方法（utility）。不必选中元素，就可以直接使用这些方法。

```
　　$.trim() 去除字符串两端的空格。

　　$.each() 遍历一个数组或对象。

　　$.inArray() 返回一个值在数组中的索引位置。如果该值不在数组中，则返回-1。

　　$.grep() 返回数组中符合某种标准的元素。

　　$.extend() 将多个对象，合并到第一个对象。

　　$.makeArray() 将对象转化为数组。

　　$.type() 判断对象的类别（函数对象、日期对象、数组对象、正则对象等等）。

　　$.isArray() 判断某个参数是否为数组。

　　$.isEmptyObject() 判断某个对象是否为空（不含有任何属性）。

　　$.isFunction() 判断某个参数是否为函数。

　　$.isPlainObject() 判断某个参数是否为用"{}"或"new Object"建立的对象。

　　$.support() 判断浏览器是否支持某个特性。
```

## 事件操作

把事件直接绑定在网页元素之上，代替了`addEventListener`：

```javascript
  $('.a').on(eventType, cb)
```

把绑定在网页元素之上的事件移除，代替了`removeEventListener`：

```javascript
  $('.a').off(eventType)
```

