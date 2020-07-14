题目《JS 对象基本用法》

内容 2：如何删除对象的属性
内容 3：如何查看对象的属性
内容 4：如何修改或增加对象的属性
内容 5：'name' in obj 和 obj.hasOwnProperty('name') 的区别

```javascript
```

# JS 对象基本用法

## 1.概述

### 1.1 定义

对象就是：一组“键值对”（key-value）的集合，是一种无序的复合数据集合。

对象是 javascript 的一种数据类型，也是唯一一种复杂数据类型。

### 1.2 创建

对象的创建方法有两种：第一种是通过构造函数`Object`生成，如下

```javascript
let obj = new Object({ name: "raven" });
// {name: "raven"}
```

第二种是通过对象字面量创建：

```javascript
let obj = { name: "raven" };
```

### 1.2 键和值

上面创建的对象`{name: "raven"}`，`name`与`"raven"`组成一个键值对，`name`为键名，它是一个字符串。对象的所有键名都是字符串，但是创建的时候加不加引号都可以，上面的例子也可以写成：

```javascript
let obj = { name: "raven" };
```

如果键名是数值，会被自动转为字符串。

```javascript
let obj = {
  1: "a",
  3.2: "b",
  1e2: true,
  1e-2: true,
  0.234: true,
  0xff: true,
};

Object.keys(obj);
// ["1", "100", "255", "3.2", "0.01", "0.234"]
```

但是如果省略引号，则需要遵守以下规则给键命名：

- 不能以数字开头
- 不能包含一些符号（标点符号，运算符号，空格等）

如果不想遵守规则，则需要在外围加上引号。

### 1.3 表达式还是语句？

对象采用大括号表示，这导致了一个问题：如果行首是一个大括号，它到底是表达式还是语句？

```javascript
{
  foo: 123;
}
```

JavaScript 引擎读到上面这行代码，会发现可能有两种含义。第一种可能是，这是一个表达式，表示一个包含 foo 属性的对象；第二种可能是，这是一个语句，表示一个代码区块，里面有一个标签 foo，指向表达式 123。

为了避免这种歧义，JavaScript 引擎的做法是，如果遇到这种情况，无法确定是对象还是代码块，一律解释为代码块。

如果要解释为对象，最好在大括号前加上圆括号。因为圆括号的里面，只能是表达式，所以确保大括号只能解释为对象。

这种差异在 eval 语句（作用是对字符串求值）中反映得最明显。

```javascript
eval("{foo: 123}"); // 123
eval("({foo: 123})"); // {foo: 123}
```

上面代码中，如果没有圆括号，eval 将其理解为一个代码块；加上圆括号以后，就理解成一个对象。

## 2. 属性操作

### 2.1 读取

读取对象的属性，有两种方法，一种是使用点运算符，还有一种是使用方括号运算符。

```javascript
let obj = {
  p: "Hello World",
};

obj.p; // "Hello World"
obj["p"]; // "Hello World"
```

方括号里可以使用引号包裹的键名，也可以是一个变量，甚至是一个表达式。

```javascript
let key1 = "bar",
  key2 = "fo";

let obj = {
  foo: "foo",
  bar: "bar",
};

obj[key1]; // "bar"
obj["fo" + "o"]; // "foo"
obj[key2 + "o"]; // "foo"
```

方括号内的变量的值和表达式的值都会被转化为字符串，然后再访问属性。

注意，数值键名不能使用点运算符（因为会被当成小数点），只能使用方括号运算符。

```javascript
let obj = {
  123: 'hello world'
};

obj.123 // 报错
obj[123] // "hello world"
```

上面代码的第一个表达式，对数值键名 123 使用点运算符，结果报错。第二个表达式使用方括号运算符，结果就是正确的。

### 2.2 赋值

点运算符和方括号运算符，还可以用来赋值。

```javascript
let obj = {};

obj.foo = 1;
obj["bar"] = 2;
// {foo: 1, bar: 2}
```

### 2.3 查看

利用`Object.keys`查看：

```javascript
let obj = { foo: 1, bar: 2 };

Object.keys(obj); // ["foo", "bar"]
```

另外，`Object.values`查看对象的值，`Object.entries`查看所有键值对，`obj.hasOwnProperty`检测是否具有某个属性。

### 2.4 删除：delete 命令

`delete`命令用于删除对象的属性

```javascript
var obj = { p: 1 };
Object.keys(obj); // ["p"]

delete obj.p; // true
obj.p; // undefined
Object.keys(obj); // []
```

上面代码中，`delete`命令删除对象`obj`的`p`属性。删除后，再读取`p`属性就会返回`undefined`，而且`Object.keys`方法的返回值也不再包括该属性。

但是，`delete`比较一根筋，只要它操作的对象是一个对象的属性，不论有没有成功删除，或者是这个对象有没有这个属性，都会返回`true`，其它情况返回`false`。

`delete`只可删除属性，不可删除对象。

## 其它

`'name' in obj`和`obj.hasOwnProperty('name')` 的区别:

二者都是查看对象是否具有某个属性，但是有一点不同：

`in`操作符会顺着原型链查看是否具有该属性，而`obj.hasOwnProperty`不会攀爬原型链，只会检查当前对象是否具有。

```javascript
let obj = {};
"toString" in obj; // true
obj.hasOwnProperty("toString"); // false
```

因为 `obj` 的原型上有`toString`
