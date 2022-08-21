form标签的属性action一般不同method:post或者get
<input type="text" placeholder="昵称" name="nick" value="小明" disabled />
<textarea
  name="sign"
  rows="5"
  cols="30"
  placeholder="请输入个性签名"
></textarea>
单选加上label加文字
<input type="password" name="password" placeholder="密码" /> 
<input type="radio" name="gender" value="male" />
<label> <input type="radio" name="gender" value="male" />男 </label>
<input id="male" type="radio" name="gender" value="male" />
<label for="male">男</label>
多选
<label> <input type="checkbox" name="interest" value="coding" />编程 </label>
<label> <input type="checkbox" name="interest" value="other" />其他 </label>
下拉选取
<select name="career">
  <option value="default">请选择职业</option>
  <option value="staff">公司职员</option>
  <option value="freelancer">自由职业者</option>
  <option value="student">学生</option>
  <option value="other">其他</option>
</select>
multiple加上是多选
<select name="career" multiple>

<button type="submit">注册</button>
字体大小
font-size: 12px;
字体粗细
font-weight: normal;
字体对齐
text-align:center|left|right
字体高度，高度如果和盒子高度一样就是垂直居中
line-height:2px;
字体间隙，如果想让盒子没有间隙可以为0
letter-spacing:30px
div默认没有高度content是内容，padding内边距，border边框
border-width粗细border-color颜色border-style类型solid实线dashed虚线border-radius: 18px;圆角box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);阴影
外边距margin: 20px;两个水平边距是和，垂直边距取最大
display:block|inline|none|inline-block
块元素，行元素，隐藏，行块元素
position:static|relative|absolute|fixed|sticky
默认，相对之前的位置，绝对，按照父元素非默认的边框为边界，固定，粘性
float: left;浮动，左右对齐
模态框
.mask {
  position: fixed; /*1*/
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7); /*2*/
}

