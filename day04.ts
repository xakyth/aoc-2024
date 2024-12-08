import fs from 'node:fs';

function search(
  x: number,
  y: number,
  dx: number,
  dy: number,
  i: number,
  word: string
): number {
  if (i == word.length) {
    return 1;
  }
  const row = x + dx * i;
  const col = y + dy * i;
  if (
    row < 0 ||
    row >= m ||
    col < 0 ||
    col >= n ||
    word[i] !== field[row][col]
  ) {
    return 0;
  }
  return search(x, y, dx, dy, i + 1, word);
}

function part1(field: string[], m: number, n: number): number {
  const directions: number[][] = [-1, 0, 1]
    .map((n) => [-1, 0, 1].map((m) => [n, m]))
    .flat(1);
  let totalCount = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (const dir of directions) {
        totalCount += search(i, j, dir[0], dir[1], 0, 'XMAS');
      }
    }
  }
  return totalCount;
}

function part2(field: string[], m: number, n: number) {
  let totalCount = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const ne = search(j, i, 1, -1, 0, 'MAS');
      const nw1 = search(j + 2, i, -1, -1, 0, 'MAS');
      const se1 = search(j, i - 2, 1, 1, 0, 'MAS');
      const sw = search(j, i, -1, 1, 0, 'MAS');
      const nw2 = search(j, i + 2, -1, -1, 0, 'MAS');
      const se2 = search(j - 2, i, 1, 1, 0, 'MAS');

      totalCount += (ne & nw1) + (ne & se1) + (sw & nw2) + (sw & se2);
    }
  }

  return totalCount;
}

const data: string = fs.readFileSync('./day04input.txt', 'utf-8');
const field: string[] = data.split('\n');

const m = field.length;
const n = field[0].length;

console.log('part1(data)', part1(field, m, n));
console.log('part2(data)', part2(field, m, n));
