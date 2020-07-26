# http 状态码

## 2XX 成功响应

- 200: OK，请求成功（put、delete、options 类请求不会返回 200）
- 201: created，put 类型请求成功返回的状态码
- 202: accepted，请求被服务器接受，但未作处理
- 204: no content，响应只有响应头，没有响应体

## 3XX 重定向

- 300: multiple choice，请求的响应可能有多种
- 301: moved permanently，请求的资源路径已经永远改变，新的 url 在响应头中的 Location 中找
- 302: found，资源路径临时改变，新的 url 在响应头中的 Location 中找
- 303: see other，引导客户端用 get 方法访问另外一个 URI
- 304 Not Modified，所请求的内容没有变化. 直接从浏览器缓存里获取

## 4XX 客户端错误

- 400：Bad Request，发送的请求语法错误
- 401：Unauthorized，需要身份验证后才能获取所请求的内容
- 403：Forbidden，客户端没有权利访问所请求内容
- 404：Not Found，找不到所请求的资源
- 405：Method Not Allowed，该请求使用的方法被服务器端禁止使用（RFC2616 中规定, GET 和 HEAD 方法不能被禁止）
- 406：Not Acceptable，没有发现合适的内容传回给客户端
- 408：Request Timeout，客户端没有在服务器预备等待的时间内完成一个请求的发送
- 409：Conflict，该请求与服务器的当前状态所冲突
- 410：Gone，所请求的资源已经被删除
- 411：Length Required，本次请求中需要 Content-Length 头字段
- 413：Request Entity Too Large，请求实体大小超过服务器的设置的最大限制
- 414：Request-URI Too Long，客户端请求所包含的 URI 地址太长
- 415：Unsupported Media Type，服务器不支持客户端所请求的媒体类型
- 417：Expectation Failed，在请求头 Expect 中指定的预期内容无法被服务器满足

## 5XX 服务器端错误

- 500：Internal Server Error，服务器遇到未知的无法解决的问题
- 501：Implemented，服务器不支持该请求中使用的方法,比如 POST 和 PUT.只有 GET 和 HEAD 是 RFC2616 规范中规定服务器必须实现的方法
- 502：Bad Gateway，服务器作为网关且从上游服务器获取到了一个无效的 HTTP 响应
- 503：Service Unavailable，由于临时的服务器维护或者过载,服务器当前无法处理请求
- 504：Gateway Timeout，服务器作为网关且不能从上游服务器及时的得到响应返回给客户端
- 505：HTTP Version Not Supported，服务器不支持客户端发送的 HTTP 请求中所使用的 HTTP 协议版本
