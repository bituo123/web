需求：
4*4的方格，我们称为cell
游戏开始随机出现两个cell，每个cell的值百分之九十为2，百分之十为4
上下左右键盘操作每个cell按照方向移动，直到不可移动为止
如果移动以后两个cell值相同，则合并
每个cell移动有100ms移动动画
每个cell的出现有个短暂放大效果
合并有个短暂放大回弹效果
顶部的Score记录当前分数，BestScore记录历史最高，每次合并都会产生分数变化，计算方法：分数=原来分数+合并的值
游戏时刻记录进度，刷新页面重现游戏进度
某个cell的值为2048，就胜利
当每个方格都有值，并且相邻两个方格无法合并游戏结束
技术：
静态页面渲染
事件处理，DOM监听事件
cell移动，监听键盘事件
cell动态随机添加，DOM动态操作
cell移动合并，js列表，对象，方法等数据结构和技巧
动画：transform和animation
本地缓存，localStorage
框架：
nav
desc
main（grid-container--tile-container）
footer
代码
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>优课达-2048</title>
    <link rel="stylesheet" href="./style/index.css" />
  </head>
  <body>
    <div class="container">
      <nav>...</nav>
      <div class="desc">...</div>
      <main>
        <div class="game-grid">...</div>
        <div class="tile-container">...</div>
      </main>
      <footer>...</footer>
    </div>
  </body>
</html>
文件目录：
images
style（index.scss,nav.scss,main.scss,desc.scss)
index.html
其中main.scss
$field-width: 290px;
$grid-spacing: 10px;
$grid-row-cells: 4;
$tile-size: ($field-width - $grid-spacing * ($grid-row-cells + 1)) / $grid-row-cells;
$tile-border-radius: 3px;

main {
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  width: $field-width;
  height: $field-width;
  position: relative;
  padding: $grid-spacing;
  background: #bbada0;
  border-radius: 8px;

  .game-grid {
    .grid-row {
      .grid-cell {
      }
    }
  }
}
