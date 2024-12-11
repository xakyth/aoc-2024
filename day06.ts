import fs from 'node:fs';

enum Direction {
  Up = 1,
  Right,
  Down,
  Left,
}

function turnRight(dir: Direction): Direction {
  return dir == Direction.Left ? 1 : dir + 1;
}

function inField(x: number, y: number): boolean {
  return !(y < 0 || y >= rowsCount || x < 0 || x >= colsCount);
}

function part1(): number {
  let direction: Direction = 1;
  let x = initX,
    y = initY;
  while (true) {
    if (!inField(x, y)) {
      break;
    }
    visited[y][x] = true;
    const prevX = x;
    const prevY = y;
    if (direction == Direction.Up) {
      y--;
    } else if (direction == Direction.Right) {
      x++;
    } else if (direction == Direction.Down) {
      y++;
    } else {
      x--;
    }
    if (inField(x, y) && field[y][x] == '#') {
      x = prevX;
      y = prevY;
      direction = turnRight(direction);
    }
  }
  return visited.flat().reduce((acc, cur) => acc + +cur, 0);
}

function part2(): number {
  let loopObstacles = 0;
  for (let i = 0; i < rowsCount; i++) {
    for (let j = 0; j < colsCount; j++) {
      if ((i == initY && j == initX) || !visited[i][j]) {
        continue;
      }
      field[i][j] = '#';
      const visitedWithDirections: Set<Direction>[][] = new Array(rowsCount);
      for (let k = 0; k < rowsCount; k++) {
        visitedWithDirections[k] = new Array(colsCount);
        for (let k1 = 0; k1 < colsCount; k1++) {
          visitedWithDirections[k][k1] = new Set();
        }
      }
      let direction: Direction = 1;
      let x = initX,
        y = initY;
      while (true) {
        if (!inField(x, y)) {
          break;
        }
        if (visitedWithDirections[y][x].has(direction)) {
          loopObstacles++;
          break;
        }
        visitedWithDirections[y][x].add(direction);
        const prevX = x;
        const prevY = y;
        if (direction == Direction.Up) {
          y--;
        } else if (direction == Direction.Right) {
          x++;
        } else if (direction == Direction.Down) {
          y++;
        } else {
          x--;
        }
        if (inField(x, y) && field[y][x] == '#') {
          x = prevX;
          y = prevY;
          direction = turnRight(direction);
        }
      }
      field[i][j] = '.';
    }
  }

  return loopObstacles;
}

const data: string = fs.readFileSync('./day06input.txt', 'utf-8');
const field: string[][] = data.split('\n').map((s) => s.split(''));
const rowsCount = field.length;
const colsCount = field[0].length;
let initX = 0;
let initY = 0;
for (let i = 0; i < rowsCount; i++) {
  for (let j = 0; j < colsCount; j++) {
    if (field[i][j] == '^') {
      initX = j;
      initY = i;
      field[i][j] = '.';
      break;
    }
  }
}

const visited: boolean[][] = new Array(rowsCount);
for (let i = 0; i < rowsCount; i++) {
  visited[i] = new Array(colsCount).fill(false);
}

console.log('part1()', part1());
console.log('part2()', part2());
