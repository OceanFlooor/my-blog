# CSS垂直居中
CSS垂直居中问题是前端在CSS中经常能遇到的问题，他的处理技巧有很多，同时也能考验前端程序员的CSS基本功是否扎实。

## 方法
假设有两个`div`，外层`.outter`包裹内层`.inner`

具体情况分两种讨论：

1. 子元素宽高已知
  * absolute + 负margin
  * absolute + calc
  
2. 子元素宽高未知
  * absolute + margin auto
  * absolute + transform
  * lineheight
  * writing-mode
  * css-table
  * flex

以下情况outter和inner的公共样式为：
```css
.outter {
  border: 1px solid red;
  width: 300px;
  height: 300px;
}

.inner {
  background-color: green;
  width: 100px;
  height: 100px;
  text-align: center;
  color: white;
}
```

## 子元素宽高已知

## absolute + 负margin

[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/1.1.html)

代码：
```html
  <style>
    .outter {
      position: relative;
    }
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -50px;
      margin-top: -50px;
    }
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

思路：利用绝对定位和相对定位将子元素div向下和向右偏移基于父元素宽高的50%，接着利用负`margin`回偏子元素的半个身位。<strong>前提是必须知道子元素的宽高。</strong>

## absolute + calc
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/1.2.html)

代码：
```html
  <style>
    .outter {
      position: relative;
    }
    .inner {
      position: absolute;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
    }
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

思路：利用绝对定位将子元素div向中心偏移，`calc(50%-50px)`计算偏移量。同样<strong>前提是必须知道子元素的宽高。</strong>

## 子元素宽高未知

以下方法，就算不知道子元素宽高，也可以实现垂直居中。

## absolute + margin auto
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/2.1.html)

代码：
```html
  <style>
    .outter {
      position: relative;
    }
    .inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

绝对定位通过设置各个方向的距离都是0，再把margin设为auto，就可以在各个方向上居中

## absolute + transform
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/2.2.html)

代码：
```html
  <style>
    .outter {
      position: relative;
    }
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      margin: auto;
    }
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

思路和 `absolute + 负margin` 一样，但是这里通过`transform: translate(-50%, -50%)` 实现负margin

## absolute + transform
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/2.3.html)
代码：
```html
  <style>
    .outter {
      line-height: 300px;
      text-align: center;
    }
    .inner {
      vertical-align: middle;
      display: inline-block;
      line-height: initial;
    }
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

把inner设置为行内元素，通过text-align就可以做到水平居中，通过vertical-align可以在垂直方向做到居中

## writing mode
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/2.4.html)

代码：
```html
  <style>
    .outter {
      writing-mode: vertical-lr;
      text-align: center;
    }
    .wrapper {
      display: inline-block;
      writing-mode: horizontal-tb;
      text-align: center;
      width: 100%;
    }
    .inner {
      display: inline-block;
      line-height: initial;
    }
  </style>

  <body>
    <div class="outter">
      <div class="wrapper">
        <div class="inner">inner div</div>
      </div>
    </div>
  </body>
```

`writing-mode`可以设置文字排列方向，outter设置`writing-mode: vertical-lr`使得内部文字垂直排列，配上`text-align: center`就可以让内元素`wrapper`垂直居中；

接下来wrapper以同样的方式设置`writing-mode: horizontal-tb`使得内部文字水平排列，配上`text-align: center`就可以让内元素`inner`在wrapper内水平居中。

## css-table
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/2.5.html)

代码：
```html
  <style>
    .outter {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
    }
    .inner {
      display: inline-block;
    }
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

父元素outter的display设置为table-cell，即可通过text-align、vertical-align控制子元素在它内部的对其方式。

## flex
[预览链接](https://oceanflooor.github.io/my-blog/static/css-verticle-center/2.6.html)

代码：
```html
  <style>
    .outter {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .inner {}
  </style>

  <body>
    <div class="outter">
      <div class="inner">inner div</div>
    </div>
  </body>
```

弹性布局，前端布局的重中之重，功能强大，必须掌握。[学习戳这里](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

另外还有一种更强大的布局方式：grid布局。比flex布局还要强大，但是因为技术太新，兼容性不好，所以目前主流的依旧是flex布局，但之后可能会被grid取代。