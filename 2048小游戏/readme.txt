JavaScript三部分，核心，文档对象，浏览器对象
核心主要部分，语法，类型，语句，关键字，保留字，操作符，对象
文档对象DOM就是获取html所有的对象，可以遍历，添加事件，修改样式
浏览器对象BOM，弹出新窗口，移动，缩放，关闭浏览器，浏览器信息
占位符${expression}，单引号使用占位符，双引号是拼接
let str = "春眠不觉晓\n" + "处处闻啼鸟\n" + "夜来风雨声\n" + "花落知多少\n";
let str = `春眠不觉晓
处处闻啼鸟
夜来风雨声
花落知多少`;
单引号还可以实现不用加转义\n，但是特殊字符需要转义，入\',\"
三元表达式let str = `这里是${false ? "浙江" : "江苏"}`;
逻辑或||逻辑与&&
数组[],let arr = new Array();
增.push('要添加的值');从尾加unshift从头加
删pop从后删，shift从前删，splice从指定位置到最后全删除，也可以两个参数
splice还可以实现增，改功能，增加：第一个参数是位置，第二个参数是0，第三个参数是增加内容，
改，第一个参数是其实位置，第二个参数是步长，从起始位置之后的步长的全部替换为第三个参数的值
查indexOf()，参数是元素值，返回的是元素的位置，可以加另一个参数，表示从第几个位置开始查
二维数组
循环，for in 是元素下标，for of 是元素值，while do while break continue
函数，内置函数
随机数const num = Math.random();
自定义函数
function f() {}这种写法不需要加分号，let a = function () {};和let print = () => {};需要加
立即执行函数(function() {})();
参数，可以加默认值，同时不在乎参数有几个
计时器
第一个参数是代码，注意代码需用引号包裹，否则会立即执行代码第二个参数是 1000，即 1000ms 后执行 console.log(2)
setTimeout('console.log(2)', 1000);
第一个参数是匿名函数第二个参数是 2000，即 2s 后执行
setTimeout(function () {}, 2000);
第一个参数是函数名，注意函数名后不要加小括号“()”，否则会立即执行 print4
setTimeout(print4, 3000);
清除计时器
clearTimeout(timerId);
这样会先隔1s才执行，为了一直执行就先print再后面
let timer = setInterval(print, 1000);
清除计时器
clearInterval(timer);
定义对象
let person = {
  name: 'henry',
  age: 18
  run: function() {
    console.log('running');
  }
}
创建对象构造函数
function People(name, age) {
  this.name = name;
  this.age = age;
}
创建对象
let person = new People('henry', 18);
对象的链式引用，对象里面还有对象，可以用.引用对象属性，也可以[]
查看对象所有属性Object.keys(person)
属性删除delete person.name;
属性增加person.gender = 'male';
遍历属性，可以用keys也可以用for in
继承，

JSON转换
JSON转换为object
const jsonStr =
  '{"sites":[{"name":"Runoob", "url":"www.runoob.com"},{"name":"Google", "url":"www.google.com"},{"name":"Taobao", "url":"www.taobao.com"}]}';
const obj = JSON.parse(jsonStr);
obj转JSON
const jsonStr2 = JSON.stringify(obj);
Map的用法和obj差不多，但是map的键可以用各种类型代替，键有排序，可以直接获取，不存在键名冲突，可以直接覆盖，obj不可以
内置对象
常量
Math.E // 常数e。
Math.LN2 // 2 的自然对数。
Math.LN10 // 10 的自然对数。
Math.LOG2E // 以 2 为底的e的对数。
Math.LOG10E // 以 10 为底的e的对数。
Math.PI // 常数π。
Math.SQRT1_2 // 0.5 的平方根。
Math.SQRT2 // 2 的平方根。
方法
Math.abs() // 绝对值
Math.ceil() // 向上取整
Math.floor() // 向下取整
Math.round() // 四舍五入取整
Math.max() // 最大值
Math.min() // 最小值
Math.pow() // 指数运算
Math.sqrt() // 平方根
Math.log() // 自然对数
Math.exp() // e的指数
Math.random() // 随机数
Storage对象
存入数据，只能存字符串，
window.localStorage.setItem('myLocalStorage', 'storage Value');
读取数据
window.localStorage.getItem('myLocalStorage');
清除数据
window.localStorage.clear();
String对象
let v2 = new String('abc');长度.length;查找.indexOf('an');去空trim()，截取substring截取参数是位置/substr截取参数是位置和长度，分割.split('|');
Array对象
join连接数组内容用参数拼接成字符串，reverse()倒叙
排序
let arr = [
  { name: "jenny", age: 18 },
  { name: "tom", age: 10 },
  { name: "mary", age: 40 },
];
arr.sort(function (a, b) {
  return a.age - b.age;
});这是从小到大，返回值大于0则表示第二个应该排在第一个之前，这个会改变原来数组
遍历
const handledArr = arr.map(function (elem, index, a) {
  elem.age += 1;
  console.log(elem, index, a);
  return elem.name;
});其中elem是元素，index是下标，a是整个数组
const handledArr = arr.forEach(function (elem, index, a) {
  elem.age += 1;
  console.log(elem, index, a);
  return elem.name;
});这个没有返回值
时间函数let now = new Date();
生成指定let dt1 = new Date(2020, 0, 6, 0, 0, 0);
let dt2 = new Date("2020-1-6");
修改日期格式let dt = Date.parse("2020-1-6");
时间转字符串let dtStr = dt.toJSON();
dt.getTime(); // 返回实例距离1970年1月1日00:00:00的毫秒数。
dt.getDate(); // 返回实例对象对应每个月的几号（从1开始）。
dt.getDay(); // 返回星期几，星期日为0，星期一为1，以此类推。
dt.getFullYear(); // 返回四位的年份。
dt.getMonth(); // 返回月份（0表示1月，11表示12月）。
dt.getHours(); // 返回小时（0-23）。
dt.getMilliseconds(); // 返回毫秒（0-999）。
dt.getMinutes(); // 返回分钟（0-59）。
dt.getSeconds(); // 返回秒（0-59）。
dt.setTime(ms); // 设置实例距离1970年1月1日00:00:00的毫秒数。
dt.setDate(date); // 设置实例对象对应每个月的几号（从1开始）。
dt.setFullYear(year); // 设置四位的年份。
dt.setMonth(month); // 设置月份（0表示1月，11表示12月）。
dt.setHours(hour); // 设置小时（0-23）。
dt.setMilliseconds(ms); // 设置毫秒（0-999）。
dt.setMinutes(min); // 设置分钟（0-59）。
dt.setSeconds(sec); // 设置秒（0-59）。
BOM对象，window窗口，navigator浏览器，history历史，screen显示屏幕。location地址
DOM查找
document.querySelector('main .core .subtitle');
document.querySelectorAll('input');
divDom.outerHTML, divDom.innerHTML, divDom.innerText
h1Dom.classList);(h1Dom.style);(h1Dom.style.color)
createElement('img');
img.setAttribute('style', 'width: 100%; height: 100%;');
select.appendChild(img);
.createTextNode
insertBefore(newNode, referenceNode)
dom.style.color = 'xxxx';
DOM事件
