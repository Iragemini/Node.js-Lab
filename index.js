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
let exit = [];

function initVisited() {
  for (let i = 0; i < visited.length; i++) {
    for (let j = 0; j < visited[i].length; j++) {
      visited[i][j] = false;
    }
  }
}

function init(maze) {
  if (!Array.isArray(maze) || !maze.length) {
    return false;
  }

  for (let i = 0, len = maze.length; i < len; i++) {
    let row = maze[i];
    if (!row.length) break;
    let rowLength = row.length;
    if (row.includes('+')) {
      if (
        i === 0 ||
        i === len - 1 ||
        row[0] === '+' ||
        row[rowLength - 1] === '+'
      ) {
        if (i === 0 || i === len - 1) {
          row.forEach((element, index) => {
            if (element === '+') {
              exit.push([i, index]); // i - endX, index - endY
            }
          });
        } else {
          row.forEach((element, index) => {
            if (element === '+' && (index === 0 || index === rowLength - 1)) {
              exit.push([i, index]); // i - endX, index - endY
            }
          });
        }
      }
    }
  }
  if (exit.length === 0) {
    console.log('The maze has no exit');
    return false;
  }
  for (let i = 0, len = maze.length; i < len; i++) {
    let row = maze[i];
    height = row.length;
    if (row.includes('0')) {
      startX = i;
      startY = row.indexOf('0');
    }
    for (let j = 0; j < visited.length; j++) {
      visited[j] = new Array(row.length);
    }
  }

  let way = false;
  for (let i = 0; i < exit.length; i++) {
    initVisited();
    answer = [];
    endX = exit[i][0];
    endY = exit[i][1];
    if (findWay(startX, startY)) {
      way = true;
      break;
    }
  }

  if (!way) {
    console.log('The maze has no exit');
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
