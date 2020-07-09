# HTML 常用重点标签

## 什么叫常用重点？

常用且重点的标签，指的是你写 html 代码的时候经常用到的，而且该标签可以解决一些非常常见的需求，必须学会。下面逐个记录。

## a

简单讲：点击，跳转。
MDN 解释：可以创建通向其他网页、文件、同一页面内的位置、电子邮件地址或任何其他 URL 的超链接。

用法：

```html
<ul>
  <li><a href="https://example.com">Website</a></li>
  <li><a href="mailto:m.bluth@example.com">Email</a></li>
  <li><a href="tel:+123456789">Phone</a></li>
  <li><a href="javascript:;">Do nothing</a></li>
</ul>
```

`href`属性可以接收网址、路径、伪协议。

- 网址
  ```
  可以带协议，也可以不带，但是推荐不带上协议，浏览器会自动给你找到合适且正确的协议
  http://google.com
  https://google.com
  //google.com
  ```
- 伪协议
  `javascript:some awesome code; 点击会执行你输入的代码 mailto: someemail... 点击发送email tel: XXXXXXX 点击拨号`
  `target`属性规定点击后网页打开方式，默认值为`_self`，就是在本标签页打开，其他的值还有`_blank`, `_top`, `_parent`,也可以由程序员自己给 window 或者 iframe 命名

## table

用于做表格，table 标签一家人：table, thead, tbody, tfoot, tr, th, td

用法：

```html
<table>
  <thead>
    <tr>
      <th colspan="2">The table header</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The table body</td>
      <td>with two columns</td>
    </tr>
  </tbody>
</table>
```

table 相关样式：table-layout，table-collapse，border-spacing

## img

作用：发送 get 请求，展示图片
用法：

```html
<img class="fit-picture" src="..." alt="..." />
```

`src`，图片 url

`alt`，图片加载失败时显示，用于说明这图片是什么

`height`, `width`，图片宽和高，指定一个即可，另一个会等比例自适应，不要两者都设定，避免导致图片变形

监听事件：onload，onerror

tips：建议给图片加上一个自适应样式例如：`max-width: 100%`

## form

表单，用于发送 get 或者 post 请求，而后刷新页面

用法：

```html
<form action="" method="get" class="form-example">
  <div class="form-example">
    <label for="name">Enter your name: </label>
    <input type="text" name="name" id="name" required />
  </div>
  <div class="form-example">
    <label for="email">Enter your email: </label>
    <input type="email" name="email" id="email" required />
  </div>
  <div class="form-example">
    <input type="submit" value="Subscribe!" />
  </div>
</form>
```

`action`：处理表单提交的 URL

`method`：请求方式

`autocomplete`：用于指示 input 元素是否能够拥有一个默认值，此默认值是由浏览器自动补全的，可取值 `on`, `off`

`target`： 表示在提交表单之后，在哪里显示响应信息

`event`：onsubmit

tips:

- 只有当表单内含有 type 为 submit 类型的元素才可以触发 submit 事件
- form 内的 input 标签要与 name

## input

作用：接受来自用户的数据，可以使用各种类型的输入数据和控件小部件，具体取决于设备和 user agent

用法：

```html
<input type="text" id="name" name="name" required minlength="4" maxlength="8" size="10" />
```

`type`：input 类型，具体有很多，默认值为 text

`event`：onchange, onfocus, onblur

## 其他标签

其他还有各式各样很多标签，比如 canvas，svg，video，audio，textarea 等

## 感想

html 标签种类非常多，有一百多种，每种标签有各种各样的用法，属性和事件，花里胡哨，所以学习 html 真的没必要挨个扫一遍，不妨直接动手用 html 写页面，常用的基本就回记住，其他记不住的说明不常用，甚至没用，需要用的时候查阅 MDN 文档即可。全部掌握真的太困难而且没必要，除非我是神人。:triumph:
