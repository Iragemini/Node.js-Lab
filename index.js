const maze = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],

  ['#', '+', '+', '+', '#', '+', '+', '+', '#'],

  ['#', '+', '#', '+', '#', '+', '#', '+', '#'],

  ['+', '+', '#', '+', '0', '+', '#', '+', '#'],

  ['#', '#', '#', '+', '#', '#', '#', '#', '#'],

  ['#', '#', '+', '+', '#', '#', '#', '#', '#'],

  ['#', '#', '+', '#', '#', '#', '#', '#', '#'],

  ['#', '#', '#', '#', '#', '#', '#', '#', '#'],
];

let visited = new Array(maze.length);
let width = maze.length;

let answer = [];
let startX;
let startY;
let endX;
let endY;

function init(maze) {
  if (!Array.isArray(maze) || !maze.length) {
    return false;
  }

  for (let i = 0; i < maze.length; i++) {
    let row = maze[i];
    height = row.length;
    if (row.includes('0')) {
      startX = i;
      startY = row.indexOf('0');
    }
    if (row.includes('+') && row[0] === '+') {
      endX = i;
      endY = 0;
    }

    for (let j = 0; j < visited.length; j++) {
      visited[j] = new Array(row.length);
    }
  }
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[i].length; j++) {
      visited[i][j] = false;
    }
  }
  let way = findWay(startX, startY);
  if (!way) {
    console.log('no way');
    return false;
  }
  console.log('answer: ', answer.reverse());
  return true;
}

function findWay(x, y) {
  if (x === endX && y === endY) return true;
  if (maze[x][y] === '#' || visited[x][y]) return false;
  visited[x][y] = true;
  if (x != 0) {
    if (findWay(x - 1, y)) {
      answer.push('top');
      return true;
    }
  }
  if (x != width - 1) {
    if (findWay(x + 1, y)) {
      answer.push('bottom');
      return true;
    }
  }
  if (y != 0) {
    if (findWay(x, y - 1)) {
      answer.push('left');
      return true;
    }
  }
  if (y != height - 1) {
    if (findWay(x, y + 1)) {
      answer.push('right');
      return true;
    }
  }
  return false;
}

init(maze);
