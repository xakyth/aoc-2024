import fs from 'node:fs';

function solution1(data: string) {
  const leftNums: number[] = Array();
  const rightNums: number[] = Array();
  data.split('\n').forEach((line) => {
    const [a, b] = line.split('   ').map((s) => +s);
    leftNums.push(a);
    rightNums.push(b);
  });
  leftNums.sort();
  rightNums.sort();
  let totalDiff = 0;
  for (let i = 0; i < leftNums.length; i++) {
    totalDiff += Math.abs(leftNums[i] - rightNums[i]);
  }

  return totalDiff;
}

function solution2(data: string) {
  const leftNums: number[] = Array();
  const rightNumsCount: Map<number, number> = new Map();
  data.split('\n').forEach((line) => {
    const [a, b] = line.split('   ').map((s) => +s);
    leftNums.push(a);
    const cnt = rightNumsCount.get(b);
    if (cnt) {
      rightNumsCount.set(b, cnt + 1);
    } else {
      rightNumsCount.set(b, 1);
    }
  });
  let score = 0;
  for (const n of leftNums) {
    const cnt = rightNumsCount.get(n);
    if (cnt) {
      score += n * cnt;
    }
  }
  return score;
}

const data: string = fs.readFileSync('./day1input.txt', 'utf-8');

console.log(solution1(data));
console.log(solution2(data));
