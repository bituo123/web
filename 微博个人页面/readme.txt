涉及到的知识点：
CSS伪元素::after/::before，可以理解为是行内元素span，使用方法:span::before {}.
CSS伪类清除浮动，如果子元素设置过float:left;属性后，会导致父元素的兄弟元素产生浮动，所以我们需要父元素包裹住浮动的子元素，
.clearfix::after{
  content: '';
  display: block;
  clear: both;
}
以上代码用来放在有浮动的子元素的父元素上。
事件伪类鼠标移动li:hover{},鼠标点击ul>li:active{},获取焦点li:focus{},需要注意移动需要在点击之前。
列表伪类,ul>li:first-child{},:last-child,第n个:nth-child(n)，不止li可以用，其他相似的都可以用
鼠标悬浮属性cursor: pointer;
盒子阴影box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.11); X 轴偏移量、Y 轴偏移量、模糊半径、扩散半径和颜色。
文字阴影text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.11);
flex布局，需要给外部元素设置display: flex;这样本来是垂直排列会变成水平排列，
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
调整水平方向对齐方式，分别是水平起点一般是左对齐(默认)，终点对齐，水平居中，均匀分配相邻项目距离相同不包括左右边界，均匀分配项目左右边界距离相同剩下的相同，均匀分配，各项间距平分
align-items: flex-start | flex-end | center | baseline | stretch;
调整垂直对齐，baseline第一行文字的基线对齐，stretch拉伸对齐项目高度相同
flex项目换行：flex-wrap，nowrap| wrap|wrap-reverse
不换行默认，换行第一行在上方，换行第一行在下方
flex项目是否压缩:flex:none|1,这是给项目本身设置的，none就是不压缩，1就是项目在剩余空间均匀放大，撑满
flex项目方向：flex-direction:row|row-reverse|column|column-reverse
从左到右默认，从右到左，从上到下，从下到上，设置之后对齐方式也会变化，设置成垂直排列的话justify-content控制垂直方向
元素溢出：overflow: visible | hidden | inherit | scroll | auto;
超出部分显示到元素外面，超出部分不可见，继承父类，超出部分滚动可以看，浏览器自定
文字溢出，text-overflow:clip|ellipsis
一刀切默认，省略号
css的预编译sass，当前文件夹下的sass编译好之后，使用命令sass index.scss:index.css，这样变成css文件
变量定义，$width: 10px;引用width: $width;
插值法定义$name: "mail";引用#{$name}
sass可以嵌套，比如main{a {}}，父选择器，可以在嵌套的时候用&代替父元素，比如&:hover{}或者&_button
复用@mixin square {}，引用.user-avatar {@include square;}有参复用@mixin square($size)，@mixin square($size: 100px)，有参引用@include square($size: 200px);
响应布局@media screen and (参数){类{属性}}
满足参数就使用里面的css样式，参数有max-width:px,min-width:px，表示不超过/超过这么多的部分，需要注意一点，如果处于两个范围之间的，比如小于900，和小于1200的这个时候需要先写小于1200的，这样实现的话先实现小于1200，当小于900的时候就用900的

