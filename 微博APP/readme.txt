<meta>设置页面是否允许用户缩放，针对搜索引擎和更新频率的描述和关键词
以下是优课达的
<!-- 声明文档使用的字符编码 -->
<meta charset="utf-8">
<!-- http-equiv相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助浏览器正确地显示网页内容 -->
<!-- 与http-equiv对应的属性值为content，这里IE=edge告诉IE使用最新的引擎渲染网页 -->
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
<!-- name属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的 -->
<meta name="title" content="优酷-中国领先视频网站,提供视频播放,视频发布,视频搜索 - 优酷视频" />
<meta name="keywords" content="视频,视频分享,视频搜索,视频播放,优酷视频" />
<meta name="description" content="视频服务平台,提供视频播放,视频发布,视频搜索,视频分享" />
<!-- 设置移动端视图 -->
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
分别是设备宽度，初始缩放一倍，最小缩放一倍，最大缩放一倍，用户不可以缩放
rem取决于根元素的字体大小，一般1rem = 16px;这样设置适应性时就可以更好设置2.5rem = 40px;
这样我们只用设置根目录字体大小，不用写很多代码
@media screen and (max-width: 768px) {
  html {
    font-size: 16px;
  }
}
@media screen and (min-width: 768px) {
  html {
    font-size: 20px;
  }
}

.title {
  font-size: 2.5rem;
}
.logo {
  width: 10rem;
  height: 10rem;
}
em是根据父类字体大小
vw，vh视图宽高，百分比计算，而之前的height是父类高度的百分比，下面是使用模态框
// 将蒙层的宽高设置为视口的宽度和高度
width: 100vw;
height: 100vh;
// 用定位把蒙层定位到浏览器的左上角
position: fixed;
top: 0;
left: 0;
设计稿尺寸的样式一般是实际的二倍，所以我们需要用到sass的函数处理
@function psd2px($px) {
  @return #{$px / 2}px;
}
.header {
  // 假设设计稿上高度是100px，那么函数参数就写100，计算后返回的值就是 50px
  height: psd2px(100);
}
一般设计稿宽度750px，我们设置html {font-size: 20px;}，设计稿100px，我们需要50px，转化成rem就是1/20*50=2.5rem，所以对于传过来的100需要经过@return #{$px / 40}rem;处理，
如果设计稿宽度为375，那么重新计算，1/20*100=5rem，则处理为@return #{$px / 20}rem;
等比例缩小字体320 / 375 * 20px;
对于关闭小按钮，用span，设置绝对定位，就可以使用高度
