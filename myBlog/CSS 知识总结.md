# CSS 知识总结
css这东西没有规律，没有为什么，很多情况下是这样就是这样，可能一句css能导致与其无关的一个甚至多个样式都出错，非常蛋疼。

## 浏览器渲染原理
首先要说说浏览器的渲染原理，浏览器是如何把html和css结合渲染成一个网页的？这里只以webkit内核浏览器为例，因为所有内核渲染原理大致相同。

  * 浏览器的高层结构
    浏览器的主要组件为：用户界面、浏览器引擎、呈现引擎、网络、用户界面后端、JavaScript 解释器、数据存储

    :point_down::point_down::point_down:

    <img src="./img/layers.png" width="400"/>

    而这里负责页面渲染的就是`呈现引擎`，拿到html和css后，它会先后解析出DOM树和CSS树，然后根据两棵树创建出渲染树`render tree`，渲染树构建完毕之后，进入布局（layout）处理阶段，也就是为每个节点分配一个应出现在屏幕上的确切坐标。下一个阶段是绘制（painting） - 呈现引擎会遍历呈现树，由用户界面后端层将每个节点绘制出来，最后展示。

    <img src="./img/webkitflow.png" height="300"/>

更多内容都在[这篇文章](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/#The_main_flow)

## Normal flow
`normal flow`，即是中文所说的文档流，但我觉得翻译成正常布局流更为贴切，因为这真的是正常的，还存在非正常的流。文档流是有一套规则布局的，并且会依据这套规则自适应，即是随着屏幕大小改变而改变，所以文档流就是自适应的。

文档流的元素有三种：inline、block和inline-block，大概有如下规则：
  * inline元素达到末尾会拆分自身，将改行装不下的部分移动至下一行
  * block元素自动占满整行，默认宽度：`width：auto`，能有多宽有多宽，而不是`width：100%`
  * inline元素无法改变宽高，高度由`line-height`间接确定，和height和padding均无关
  * block元素高度可以由它内部的文档流元素高度结合确定
  * 流的方向：从左到右，从上到下
  * 元素只要设置了`float`或者`position: absolute | fixed`，它就脱离了文档流

具体看MDN文档[normal flow](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Normal_Flow)

## 盒模型
简言之：margin、border、padding、content组成一个盒模型

盒模型有两种：content-box（默认）、border-box
  * content-box：width = content
  * border-box：width = content + padding + border

`border-box`更符合大部分人的思想，建议使用这个。

盒模型会有纵向margin合并的特性：可能为上下兄弟元素margin合并，也可能是父元素和子元素的上下方向margin合并，可充分利用这个特性，也可用各种办法消除。具体看[这里](https://css-tricks.com/almanac/properties/m/margin/)

## css布局
css目前有三种布局：float布局、flex布局、grid布局，其中float布局技术过时几乎不会用到，grid布局最新最强大，但是一般最新版本的浏览器才会兼容，所以flex布局是主要的布局方法。

### flex布局
由于MDN和[CSS Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)都说的很好了，这里只罗列出flex常用的特性：

```css
/* 变成flex流方法 */
display: flex;  

flex-direction: row | column

flex-wrap: wrap

flex-flow: <'flex-direction'> || <'flex-wrap'>

justify-content: center | space-between

align-items: center

flex: none | [ <'flex-grow'> <'flex-shrink'>? ]
```

## stacking context
即层叠上下文，我们看到的网页，上面的图片文字及各种东西，其实都是一层一层堆叠上去的，在垂直方向上他们各有高低，所以一个div内你添加一些文字，并且给div设置一个不透明的background，你会看到文字浮动在background的上方，这就是层叠上下文的作用。

一个元素的层叠上下文的顺序垂直方向由下到上依次是：

  1. 定位元素且z-index >= 0
  2. inline子元素
  3. float元素
  4. block子元素
  5. border
  6. background
  7. 定位元素且z-index < 0

只有在同一个层叠上下文里的`z-index`才能相互比较，每个层叠上下文都有不同的垂直高度，然而一个元素的`z-index`无论你设置多大或者多少，都无法穿透它所在的层叠上下文，所以`z-index`不能单纯的通过数字大小比较他们两个谁浮动在上方。

层叠上下文是可以被创建的，方法有很多，但是主要有以下这么几种：

  * 根元素\<html\>
  * `position: absolute | relative` 并且 `z-index` 不为 auto
  * `opacity` < 1
  * `transform` 不为 none
  * `position: fixed`

## css动画
css实现动画的方式有两种：`transform` 和 `animation`

transform主要的属性有四种

  * translate
  * scale
  * rotate
  * skew：倾斜，很少用到

transform适用于简单，一维方向的动画，通过配合`transition`配套食用口味更佳:open_mouth:

animation功能比transform强大，能做出复杂的动画，配合`keframes`配套食用口味更佳:open_mouth:

学习animation[请戳这里](https://css-tricks.com/almanac/properties/a/animation/)