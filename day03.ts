import fs from 'node:fs';

function part1(data: string): number {
  const regexp = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let totalSum = 0;
  const matched = data.matchAll(regexp);
  for (const match of matched) {
    totalSum += +match[1] * +match[2];
  }
  return totalSum;
}

function part2(data: string): number {
  const regexp = /(mul\((\d{1,3}),(\d{1,3})\)|(do\(\))|(don't\(\)))/g;
  let totalSum = 0;
  const matched = data.matchAll(regexp);
  let enabled = true;
  for (const match of matched) {
    if (match[1].startsWith('mul') && enabled) {
      totalSum += +match[2] * +match[3];
    } else if (match[1] === 'do()') {
      enabled = true;
    } else {
      enabled = false;
    }
  }

  return totalSum;
}

const data: string = fs.readFileSync('./day03input.txt', 'utf-8');

console.log('part1(data)', part1(data));
console.log('part2(data)', part2(data));
