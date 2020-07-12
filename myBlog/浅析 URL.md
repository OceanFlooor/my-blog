# 浅析 URL

## IP & 端口 & 域名

IP用于定位一个设备的具体地址，它可以通过DNS将域名解析得到。
几个特殊的IP：
  * 127.0.0.1 ，等同localhost
  * localhost
  * 0.0.0.0  不表示任何设备

端口：
  * 一个端口只能提供一种服务
  * http默认端口为80
  * https默认端口为443
  * ftp默认端口为21
  * 一台机器一共有65535个端口，其中0~1023为系统默认占用

所以只有 IP + 端口 才可以获取具体服务

域名：
不好表述，打个比方：
```
https://github.com/
```
这是一个url，而`github.com`就是域名，值得注意的是，域名是有分等级的，例如`www.github.com`，这里com是顶级域名，`github.com` 是二级域名，`www.github.com` 是三级域名，他们彼此之间是父子关系，所以`github.com`和`www.github.com`并非同一种域名，这里的`www`其实是非常多余的，它可以使任意英文串。

## ping && nslookup

ping：

一个命令，用于查看目标IP或者域名的相应速度等相关信息。

用法：
```
ping + ip
ping + domain

example:
C:\Users\83617>ping www.baidu.com

正在 Ping www.a.shifen.com [180.101.49.11] 具有 32 字节的数据:
来自 180.101.49.11 的回复: 字节=32 时间=14ms TTL=52
来自 180.101.49.11 的回复: 字节=32 时间=13ms TTL=52
来自 180.101.49.11 的回复: 字节=32 时间=12ms TTL=52
来自 180.101.49.11 的回复: 字节=32 时间=11ms TTL=52

180.101.49.11 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 11ms，最长 = 14ms，平均 = 12ms
```

nslookup：通过域名找对于的ip
用法：
```
nslookup 域名

example:
C:\Users\83617>nslookup www.baidu.com
服务器:  XiaoQiang
Address:  192.168.31.1

非权威应答:
名称:    www.a.shifen.com
Addresses:  180.101.49.12
          180.101.49.11
Aliases:  www.baidu.com
```

## DNS
DNS( Domain Name System)是“域名系统”的英文缩写，DNS是应用层协议，事实上他是为其他应用层协议工作的，包括不限于HTTP和SMTP以及FTP，用于将用户提供的主机名解析为ip地址。

图解:point_down::point_down::point_down:

<img src="./img/DNS.png" width="800"/>

过程还是挺复杂的，简单的来说就是拿到域名之后DNS解析会进行如下步骤：（www.example.com）
  * 先查本地有没有目标域名的IP，没有则往下进行
  * 找运营商要顶级域名`.com`的IP，接着下一步
  * 找顶级域名服务器要二级域名`example.com`的IP，接着下一步
  * 找二级域名服务器要三级域名`www.example.com`的IP，接着下一步
  * 找到之后返回并且存入本地DNS服务器中，下次请求本地就有域名的IP了

## url

url是浏览器用来检索web上公布的任何资源的机制。就是一个给定的独特资源在Web上的地址。理论上说，每个有效的URL都指向一个独特的资源。这个资源可以是一个HTML页面，一个CSS文档，一幅图像，等等。[MDN解释的太好了](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL)


一个URL由不同的部分组成，其中一些是必须的，而另一些是可选的，一个完整的url：

```
url = 协议 + 域名 | IP + 端口 + 路径 + 参数 + 锚点

example：
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
```

`http://` 是协议。它表明了浏览器必须使用何种协议。它通常都是HTTP协议或是HTTPS协议，即HTTPS。Web需要它们二者之一，但浏览器也知道如何处理其他协议，比如`mailto:`（打开邮件客户端）或者 `ftp:`（处理文件传输）。

`www.example.com` 是域名。 它表明正在请求哪个Web服务器。或者，可以直接使用IP address, 但是因为它不太方便，所以它不经常在网络上使用。

`:80` 是端口。如果Web服务器使用HTTP协议的标准端口（HTTP为80，HTTPS为443）来授予其资源的访问权限，则通常会被忽略。否则是强制性的。

`/path/to/myfile.html` 是网络服务器上资源的路径。在Web的早期阶段，像这样的路径表示Web服务器上的物理文件位置。

`?key1=value1&key2=value2` 是提供给网络服务器的额外参数。 这些参数是用 & 符号分隔的键/值对列表。

`#SomewhereInTheDocument` 是资源本身的另一部分的锚点. 锚点表示资源中的一种“书签”，给浏览器显示位于该“加书签”位置的内容的方向。例如，在HTML文档上，浏览器将滚动到定义锚点的位置;在视频或音频文档上，浏览器将尝试转到锚代表的时间。值得注意的是，＃后面的部分（也称为片段标识符）从来没有发送到请求的服务器。

## 经典问题：输入url到页面展示经历了什么？

1.在客户端浏览器中输入URL

2.DNS 解析:将域名解析成 IP 地址

3.三次握手建立TCP连接

4.发送请求，响应请求

5.浏览器解析渲染页面

6.四次挥手断开TCP连接

[详解点击这里](https://zhuanlan.zhihu.com/p/57895541)
