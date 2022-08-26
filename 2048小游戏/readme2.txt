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
cell
// tile.js
function Tile(position, value) {
  this.row = position.row;
  this.column = position.column;
  this.value = value;
}
4*4的方格面板
//grid.js
function Grid(size = 4) {
  this.size = size;
  this.cells = [];
  this.init(size);
}

// prototype 设置方法
Grid.prototype.init = function (size) {
  for (let row = 0; row < size; row++) {
    this.cells.push([]);
    for (let column = 0; column < size; column++) {
      this.cells[row].push(null);
    }
  }
};
添加cell
Grid.prototype.add = function (tile) {
  this.cells[tile.row][tile.column] = tile;
};
// 获取所有可用方格的位置
Grid.prototype.availableCells = function() {
  const availableCells = [];
  for (let row = 0; row < this.cells.length; row++) {
    for (let column = 0; column < this.cells[row].length; column++) {
      // 如果当前方格没有内容，则其可用（空闲）
      if (!this.cells[row][column]) {
        availableCells.push({ row, column });
      }
    }
  }
  return availableCells;
};
// 随机获取某个可用方格的位置
Grid.prototype.randomAvailableCell = function() {
  // 获取到所有的空闲方格
  const cells = this.availableCells();
  if (cells.length > 0) {
    // 利用Math.random()随机获取其中的某一个
    return cells[Math.floor(Math.random() * cells.length)];
  }
};
在index.js里面添加cell
// index.js
let grid = new Grid();
let tile = new Tile(
  {
    row: 0,
    column: 0,
  },
  2
);
grid.add(tile);
渲染
//render.js
function Render() {
  this.tileContainer = document.querySelector('.tile-container');
}

// 渲染整个grid
Render.prototype.render = function(grid) {
  for (let row = 0; row < grid.size; row++) {
    for (let column = 0; column < grid.size; column++) {
      // 如果grid中某个cell不为空，则渲染这个cell
      if (grid.cells[row][column]) {
        this.renderTile(grid.cells[row][column]);
      }
    }
  }
};

// 渲染单个tile
Render.prototype.renderTile = function(tile) {
  // 创建一个tile-inner
  const tileInner = document.createElement('div');
  tileInner.setAttribute('class', 'tile-inner');
  tileInner.innerHTML = tile.value;

  // 创建一个tile
  const tileDom = document.createElement('div');
  let classList = [
    'tile',
    `tile-${tile.value}`,
    `tile-position-${tile.row + 1}-${tile.column + 1}`
  ];
  tileDom.setAttribute('class', classList.join(' '));
  tileDom.appendChild(tileInner);
  this.tileContainer.appendChild(tileDom);
};
随机格式化
index里面随机空闲位置创建节点
let grid = new Grid();
let render = new Render();
for (let i = 0; i < 2; i++) {
  // 90%概率为2，10%为4
  const value = Math.random() < 0.9 ? 2 : 4;
  // 随机一个方格的位置
  const position = grid.randomAvailableCell();
  // 添加到grid中
  grid.add(new Tile(position, value));
}
render.render(grid);
游戏控制器
//manager.js
function Manager(size = 4) {
  this.size = size;
  this.grid = new Grid(size);
  this.render = new Render();
  this.start();
}

Manager.prototype.start = function () {
  for (let i = 0; i < 2; i++) {
    // 90%概率为2，10%为4
    const value = Math.random() < 0.9 ? 2 : 4;
    // 随机一个方格的位置
    const position = this.grid.randomAvailableCell();
    // 添加到grid中
    this.grid.add(new Tile(position, value));
  }
  this.render.render(this.grid);
};
键盘监听
window.addEventListener('keyup', function (e) {
  console.log(e.keyCode);
});
38 => 上
37 => 左
40 => 下
39 => 右
listener监听回调控制
//listener.js
function Listener({ move: moveFn }) {
  window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 38:
        moveFn('向左');
        break;
      case 37:
        moveFn('向上');
        break;
      case 39:
        moveFn('向下');
        break;
      case 40:
        moveFn('向右');
        break;
    }
  });
}
之后在控制器里调用
//manager.js

this.listener = new Listener({
  move: function (direction) {
    console.log(direction);
  },
});
方向向量化
左 => row: 1, column: 0  // 列数索引 -1, 也就是column -1
右 => row: 1, column: 2  // 列数索引 +1, 也就是column +1
上 => row: 0, column: 1  // 行数索引 -1, 也就是row -1
下 => row: 2, column: 1  // 行数索引 +1, 也就是row +1
重新写监听回调
//listener.js
function Listener({ move: moveFn }) {
  window.addEventListener('keyup', function (e) {
    switch (e.keyCode) {
      case 38:
        moveFn({ row: -1, column: 0 });
        break;
      case 37:
        moveFn({ row: 0, column: -1 });
        break;
      case 39:
        moveFn({ row: 0, column: 1 });
        break;
      case 40:
        moveFn({ row: 1, column: 0 });
        break;
    }
  });
}
cell移动
两条规则不考虑方块合并
1同一排或者同一列方块移动顺序，顺序，顺序跟随具体的方向，
2每个方格都是移动到该方向的最后一个空白位置
按照方向遍历顺序
//manager.js
Manager.prototype.getPaths = function (direction) {
  let rowPath = [];
  let columnPath = [];
  for (let i = 0; i < this.size; i++) {
    rowPath.push(i);
    columnPath.push(i);
  }

  // 向右的时候
  if (direction.column === 1) {
    columnPath = columnPath.reverse();
  }

  // 向下的时候
  if (direction.row === 1) {
    rowPath = rowPath.reverse();
  }
  return {
    rowPath,
    columnPath,
  };
};
小知识
{
  rowPath, columnPath;
}

// 等同于

{
  rowPath: rowPath,
  columnPath: columnPath
}
map里面，如果kv变量名称相同，可以省略冒号
规则2寻找目标位置
// 寻找移动方向目标位置
Manager.prototype.getNearestAvaibleAim = function (aim, direction) {
  // 位置 + 方向向量的计算公式
  function addVector(position, direction) {
    return {
      row: position.row + direction.row,
      column: position.column + direction.column,
    };
  }
  aim = addVector(aim, direction);

  // 获取grid中某个位置的元素
  let next = this.grid.get(aim);

  // 如果next元素存在（也就是此目标位置已经有Tile），或者是超出游戏边界，则跳出循环。目的：就是找到最后一个空白且不超过边界的方格
  while (!this.grid.outOfRange(aim) && !next) {
    aim = addVector(aim, direction);
    next = this.grid.get(aim);
  }

  // 这时候的aim总是多计算了一步，因此我们还原一下
  aim = {
    row: aim.row - direction.row,
    column: aim.column - direction.column,
  };

  return {
    aim,
    next,
  };
};
// 如果next元素存在（也就是此目标位置已经有Tile，
// 或者是超出游戏边界，则跳出循环。
// 目的：就是找到最后一个空白且不超过边界的方格
while (!this.grid.outOfRange(aim) && !next) {
  aim = addVector(aim, direction);
  next = this.grid.get(aim);
}
新增方法
// grid.js

// 获取某个位置的Tile
Grid.prototype.get = function (position) {
  if (this.outOfRange(position)) {
    return null;
  }
  return this.cells[position.row][position.column];
};

// 判断某个位置是否超出边界
Grid.prototype.outOfRange = function (position) {
  return (
    position.row < 0 ||
    position.row >= this.size ||
    position.column < 0 ||
    position.column >= this.size
  );
};
cell移动
根据方向获取遍历顺序，跟随顺序遍历，遍历时如果有cell，则移动，根据cell的位置和方向获取目标移动位置，进行移动，只要有一个节点移动，重新调用渲染器渲染grid
// manager.js
Manager.prototype.listenerFn = function(direction) {
  // 定义一个变量，判断是否引起移动
  let moved = false;

  const { rowPath, columnPath } = this.getPaths(direction);
  for (let i = 0; i < rowPath.length; i++) {
    for (let j = 0; j < columnPath.length; j++) {
      const position = { row: rowPath[i], column: columnPath[j] };
      const tile = this.grid.get(position);
      if (tile) {
        // 当此位置有Tile的时候才进行移动
        // 移动时，首先获取目标移动位置
        const { aim, next } = this.getNearestAvaibleAim(position, direction);
        this.moveTile(tile, aim);
        moved = true;
      }
    }
  }

  // 移动以后进行重新渲染
  if (moved) {
    this.render.render(this.grid);
  }
};
对movecell的处理，因为渲染扫描grid的所有cell，动态生成class，改变grid的cell位置，页面就会重新渲染，先把cell对应的grid原始位置设置为null，更新cell的position，把更新的cell设置到grid新位置
// manager.js

// 移动Tile，先将grid中老位置删除，在添加新位置
Manager.prototype.moveTile = function(tile, aim) {
  this.grid.cells[tile.row][tile.column] = null;
  tile.updatePosition(aim);
  this.grid.cells[aim.row][aim.column] = tile;
};
// tile.js

// 更新Tile的位置
Tile.prototype.updatePosition = function(position) {
  this.row = position.row;
  this.column = position.column;
};
最后调用监听回调
let self = this;
this.listener = new Listener({
  move: function(direction) {
    self.listenerFn(direction);
  }
});
// render.js

// 渲染整个grid, 在之前先清空所有的Tile
Render.prototype.render = function(grid) {
  this.empty();
  ...
};

Render.prototype.empty = function() {
  this.tileContainer.innerHTML = '';
};
cell合并
方块移动到不能移动为止，下一个位置的value和该方法的value值一样
listener的代码
// 移动核心逻辑
Manager.prototype.listenerFn = function(direction) {
  // 定义一个变量，判断是否引起移动
  let moved = false;

  const { rowPath, columnPath } = this.getPaths(direction);
  for (let i = 0; i < rowPath.length; i++) {
    for (let j = 0; j < columnPath.length; j++) {
      const position = { row: rowPath[i], column: columnPath[j] };
      const tile = this.grid.get(position);
      if (tile) {
        // 当此位置有Tile的时候才进行移动
        const { aim, next } = this.getNearestAvaibleAim(position, direction);

        // 区分合并和移动，当next值和tile值相同的时候才进行合并
        if (next && next.value === tile.value) {
          // 合并位置是next的位置，合并的value是tile.value * 2
          const merged = new Tile(
            {
              row: next.row,
              column: next.column
            },
            tile.value * 2
          );
          //将合并以后节点，加入grid
          this.grid.add(merged);
          //在grid中删除原始的节点
          this.grid.remove(tile);
          moved = true;
        } else {
          this.moveTile(tile, aim);
          moved = true;
        }
      }
    }
  }

  // 移动以后进行重新渲染
  if (moved) {
    this.render.render(this.grid);
  }
};
grid的删除
// grid.js
Grid.prototype.remove = function(tile) {
  this.cells[tile.row][tile.column] = null;
};
cell合并后置逻辑
合并或者移动后产生新的cell，抽离出来前面随机生成cell的函数
//manager.js

// 随机添加一个节点
Manager.prototype.addRandomTile = function() {
  const position = this.grid.randomAvailableCell();
  if (position) {
    // 90%概率为2，10%为4
    const value = Math.random() < 0.9 ? 2 : 4;
    // 随机一个方格的位置
    const position = this.grid.randomAvailableCell();
    // 添加到grid中
    this.grid.add(new Tile(position, value));
  }
};

修改调用区域代码
// manager.js
Manager.prototype.start = function() {
  for (let i = 0; i < 2; i++) {
    this.addRandomTile();
  }
  this.render.render(this.grid);
};

// 移动核心逻辑
Manager.prototype.listenerFn = function(direction) {
  // ...
  if (moved) {
    this.addRandomTile();
    this.render.render(this.grid);
  }
};
移动动画
加入动画分为两步1，使用transform动画属性，2，我们的cell是临时的节点，不会出现class的切换效果，也不会出现transform的动画效果，所以我们首先把cell的class设置为原始位置，之后延迟设置为当前位置
const div = document.createElement('div');
div.setAttribute('class', 'tile-position-1-1');
setTimeout(() => {
  div.setAttribute('class', 'tile-posiiton-1-4');
}, 16);
首先设置为第一行第一列，之后设置为第一行第四列，16ms是人眼识别的60帧，1s有60副，人的感官就很流畅，则每一帧时间为（1000/60）ms，约定为16ms
加前置位置
// tile.js
function Tile(position, value) {
  this.row = position.row;
  this.column = position.column;
  this.value = value;

  // 新增prePosition属性
  this.prePosition = null;
}

Tile.prototype.updatePosition = function(position) {
  // 更新的时候，先将当前位置，保存为prePosition
  this.prePosition = { row: this.row, column: this.column };

  this.row = position.row;
  this.column = position.column;
};
渲染当前位置
// render.js
// 渲染单个tile
Render.prototype.renderTile = function(tile) {
  // 创建一个tile-inner
  const tileInner = document.createElement('div');
  tileInner.setAttribute('class', 'tile-inner');
  tileInner.innerHTML = tile.value;

  // 创建一个tile
  const tileDom = document.createElement('div');
  let classList = [
    'tile',
    `tile-${tile.value}`,
    `tile-position-${tile.row + 1}-${tile.column + 1}`
  ];

  if (tile.prePosition) {
    // 先设置之前的位置
    classList[2] = `tile-position-${tile.prePosition.row + 1}-${tile.prePosition
      .column + 1}`;
    // 延迟设置当前的位置
    setTimeout(function() {
      classList[2] = `tile-position-${tile.row + 1}-${tile.column + 1}`;
      tileDom.setAttribute('class', classList.join(' '));
    }, 16);
  }

  tileDom.setAttribute('class', classList.join(' '));
  tileDom.appendChild(tileInner);
  this.tileContainer.appendChild(tileDom);
};
确认cell有transform
.tile {
  position: absolute;
  width: $tile-size;
  height: $tile-size;
  border-radius: 4px;

  /*transition 移动动画*/
  transition: transform 100ms ease-in-out;
}
合并保留动画，我们要保留合并前两个cell，所以加属性
// tile.js
function Tile(position, value) {
  this.row = position.row;
  this.column = position.column;
  this.value = value;

  // 新增prePosition属性
  this.prePosition = null;
  // 存储merged两个Tile
  this.mergedTiles = null;
}
处理合并代码
// 移动核心逻辑
Manager.prototype.listenerFn = function(direction) {
  //...
  if (next && next.value === tile.value) {
    // 合并位置是next的位置，合并的value是tile.value * 2
    const merged = new Tile(
      {
        row: next.row,
        column: next.column
      },
      tile.value * 2
    );
    this.score += merged.value;

    //...
    if (merged.value === this.aim) {
      this.status = 'WIN';
    }

    // 特别注意下面两句话
    merged.mergedTiles = [tile, next];
    tile.updatePosition({ row: next.row, column: next.column });
    moved = true;
  }

  // ...
};
渲染
// 渲染单个tile
Render.prototype.renderTile = function(tile) {
  //...
  if (tile.prePosition) {
    // ...
  } else if (tile.mergedTiles) {
    //如果有mergedTiles，则渲染mergedTile的两个Tile
    tileDom.setAttribute('class', classList.join(' '));
    for (let i = 0; i < tile.mergedTiles.length; i++) {
      this.renderTile(tile.mergedTiles[i]);
    }
  }
};
本地存储
加入存储
storage.js
// 历史最高分
const BestScoreKey = '2048BestScore';
// 方格状态 和 分数
const CellStateKey = '2048CellState';

function Storage() {}

Storage.prototype.setCellState = function({ score, grid }) {
  // 存储方格状态 和 分数
};

Storage.prototype.getCellState = function() {
  // 获取方格状态
};
移动之后渲染之前保存
//manager.js

Manager.prototype._render = function() {
  // 添加在此处进行处理

  this.render.render(this.grid, { score: this.score, status: this.status });
};
序列化和反序列化
把对象变成字符串是序列化
把grid变成json，然后转化为字符串
主体分为grid和cell序列化
//tile.js
Tile.prototype.serialize = function() {
  return {
    position: {
      row: this.row,
      column: this.column
    },
    value: this.value
  };
};
//grid.js

Grid.prototype.serialize = function() {
  const cellState = [];

  // cellState 是一个二维数组，分别存储整个Grid信息。
  // 如果该位置有Tile, 则返回 Tile序列化结果
  // 如果该位置没有Tile，则存储null
  for (let row = 0; row < this.size; row++) {
    cellState[row] = [];
    for (let column = 0; column < this.size; column++) {
      cellState[row].push(
        this.cells[row][column] ? this.cells[row][column].serialize() : null
      );
    }
  }

  return {
    size: this.size,
    cells: cellState
  };
};
反序列化
function Grid(size = 4, state) {
  this.size = size;
  this.cells = this.init(size);

  // 如果有之前的进度，则恢复
  if (state) {
    this.recover(state);
  }
}

Grid.prototype.recover = function({ size, cells }) {
  this.size = size;
  // 遍历这个二维数组，如果某个cell存在，则新建一个Tile节点。
  for (let row = 0; row < this.size; row++) {
    for (let column = 0; column < this.size; column++) {
      const cell = cells[row][column];
      if (cell) {
        this.cells[row][column] = new Tile(cell.position, cell.value);
      }
    }
  }
};
历史进度流程
const CellStateKey = '2048CellState';

//...

// 存储方格状态和分数
Storage.prototype.setCellState = function({ score, grid }) {
  window.localStorage.setItem(
    CellStateKey,
    JSON.stringify({
      score,
      grid: grid.serialize()
    })
  );
};

// 获取方格信息
Storage.prototype.getCellState = function() {
  const cellState = window.localStorage.getItem(CellStateKey);
  return cellState ? JSON.parse(cellState) : null;
};
完善存储每一步
function Manager(size = 4, aim = 2048) {
  //...
  // 新增storage属性
  this.storage = new Storage();
  //...
}

Manager.prototype._render = function() {
  // 渲染之前调用存储
  this.storage.setCellState({ score: this.score, grid: this.grid });
  this.render.render(this.grid, { score: this.score, status: this.status });
};
完善恢复方格
// manager.js
Manager.prototype.defaultStart = function() {
  const state = this.storage.getCellState();
  // 如果存在缓存则恢复
  if (state) {
    this.score = state.score;
    this.status = 'DOING';
    this.grid = new Grid(this.size, state.grid);
    this._render();
  } else {
    this.start();
  }
};
