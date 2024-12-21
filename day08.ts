import fs from 'node:fs';

function isInField(x: number, y: number) {
  return x >= 0 && x < n && y >= 0 && y < m;
}

function part1(): number {
  let totalAntinodes = 0;

  const antinodes: boolean[][] = Array.from(new Array(m), () => new Array());

  for (const coords of antennasMap.values()) {
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const x1 = coords[i][0];
        const y1 = coords[i][1];
        const x2 = coords[j][0];
        const y2 = coords[j][1];

        const x3 = x1 + x1 - x2;
        const y3 = y1 + y1 - y2;
        const x4 = x2 - (x1 - x2);
        const y4 = y2 - (y1 - y2);

        if (isInField(x3, y3)) {
          antinodes[y3][x3] = true;
        }
        if (isInField(x4, y4)) {
          antinodes[y4][x4] = true;
        }
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      totalAntinodes += antinodes[j][i] ? 1 : 0;
    }
  }
  return totalAntinodes;
}

function part2(): number {
  let totalAntinodes = 0;

  const antinodes: boolean[][] = Array.from(new Array(m), () =>
    new Array(n).fill(false)
  );

  for (const coords of antennasMap.values()) {
    for (let i = 0; i < coords.length - 1; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const x1 = coords[i][0];
        const y1 = coords[i][1];
        const x2 = coords[j][0];
        const y2 = coords[j][1];
        antinodes[y1][x1] = true;
        antinodes[y2][x2] = true;

        const dx = x1 - x2;
        const dy = y1 - y2;
        let x3 = x1;
        let y3 = y1;
        let x4 = x2;
        let y4 = y2;
        while (isInField(x3 + dx, y3 + dy)) {
          x3 += dx;
          y3 += dy;
          antinodes[y3][x3] = true;
        }
        while (isInField(x4 - dx, y4 - dy)) {
          x4 -= dx;
          y4 -= dy;
          antinodes[y4][x4] = true;
        }
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      totalAntinodes += antinodes[j][i] ? 1 : 0;
    }
  }
  return totalAntinodes;
}

const data: string = fs.readFileSync('./day08input.txt', 'utf-8');
// const data: string = fs.readFileSync('./day08sampleinput.txt', 'utf-8');
const field: string[][] = data.split('\n').map((arr) => arr.split(''));
const m = field.length,
  n = field[0].length;
const antennasMap: Map<string, number[][]> = new Map();
for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    const char = field[i][j];
    if (char == '.') {
      continue;
    }
    let coords = antennasMap.get(char);
    if (!coords) {
      coords = [];
    }
    coords.push([j, i]);
    antennasMap.set(char, coords);
  }
}

console.log('part1()', part1());
console.log('part2()', part2());
