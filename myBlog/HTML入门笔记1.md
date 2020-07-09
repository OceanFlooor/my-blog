# HTML 入门笔记 1

## html 是什么？怎么出现的？

html 全称：`hyper text markup language`，翻译成中文就是“超文本标记语言”，于 1990 年一位物理学家 Tim Berners-Lee 发明，用于展示网页内容，与此同时，Tim Berners-Lee 还一并发明了`http`,`World Wide Web`，并且自己写了服务器，自己写了浏览器，旨在实现用户只要输入网址，就能在浏览器中展示网页，实现了“上网”这个概念。因此才有了今天的我在 github 上写下这段话并通过网络提交到 github 上让你点击一个网址就能看到。真的牛逼坏了:speak_no_evil:

<img src="./../img/xixi.jpg" width = "250" height = "200">

## html 长什么样子？

下面贴一段 html 起手代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

首先第一句`<!DOCTYPE html>`声明文档类型，就是告诉浏览器按照 W3C 规定的标准来解释我，别给我整一些奇奇怪怪的东西，然后`<html lang="en">`表示语言，如果是中文网站可以把`lang`的值设置为`zh-CN`。`<meta charset="UTF-8" />`表示文件的字符编码方式，以`utf-8`形式编码。

然后重点来了：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

这个标签作用简单的解释就是兼容移动端，这标签是苹果公司发明的一个标签，他们称之为`viewport meta tag`,其中这个`viewport`就是一个视口的概念。视口有三种，`layout viewport`,`visual viewport`,`ideal viewport`，概念比较多，可以看看国外一个[大神的文章](https://www.quirksmode.org/mobile/metaviewport/)

接下来`<meta http-equiv="X-UA-Compatible" content="ie=edge" />`这句话作用是，如果使用 ie 浏览器打开这个页面，告诉浏览器使用最新的 IE 内核去解析，因为老版本 ie 各种不支持各种 bug。

## html 常用的表章节的标签

h1~h6：表行，数字越小默认字体越大
section：文档中的节，文章的章节、标签对话框中的标签页、或者论文中有编号的部分都可以用上
article：表文章内容
p：表段落
main：表文档的主体部分
header：头部
footer：尾部
aside：表示一个和其余页面内容几乎无关的部分
div：无语义化的块级元素，用于分隔

## 全局属性

全局属性指的是所有 html 标签都具有的属性。他们都是：class, contenteditable(带上表用户可编辑内容), hidden, id, style, tabindex, title

## html 常用的表内容的标签

ol,ul,li：ol+li 为有序列表， ul+li 为无序列表

dl,dt,dd：用于表示一个表格

```html
<dl>
  <dt>标题标题</dt>
  <dd>内容内容</dd>
  <dd>内容内容</dd>
</dl>
```

pre: pre 标签包含的内容多个连续空格或者回车都会被解析出来
code：表示代码部分
hr：横向分割线
br：结束该行，换行
a：超链接
em：强调字体
strong：强调字体
quote：内联引用
blockquote：块级引用
