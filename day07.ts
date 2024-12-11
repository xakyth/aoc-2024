import fs from 'node:fs';

function part1(): number {
  let totalCalibrationResult = 0;
  function backtrack(
    idx: number,
    operandsCount: number,
    acc: number,
    target: number,
    curRow: number
  ): boolean {
    if (idx == operandsCount) {
      return acc == target;
    }
    if (acc > target) {
      return false;
    }
    return (
      backtrack(
        idx + 1,
        operandsCount,
        acc + operands[curRow][idx],
        target,
        curRow
      ) ||
      backtrack(
        idx + 1,
        operandsCount,
        acc * operands[curRow][idx],
        target,
        curRow
      )
    );
  }
  for (let i = 0; i < testValues.length; i++) {
    if (backtrack(1, operands[i].length, operands[i][0], testValues[i], i)) {
      totalCalibrationResult += testValues[i];
    }
  }

  return totalCalibrationResult;
}

function part2(): number {
  let totalCalibrationResult = 0;
  function backtrack(
    idx: number,
    operandsCount: number,
    acc: number,
    target: number,
    curRow: number
  ): boolean {
    if (idx == operandsCount) {
      return acc == target;
    }
    if (acc > target) {
      return false;
    }
    return (
      backtrack(
        idx + 1,
        operandsCount,
        acc + operands[curRow][idx],
        target,
        curRow
      ) ||
      backtrack(
        idx + 1,
        operandsCount,
        acc * operands[curRow][idx],
        target,
        curRow
      ) ||
      backtrack(
        idx + 1,
        operandsCount,
        +`${acc}${operands[curRow][idx]}`,
        target,
        curRow
      )
    );
  }
  for (let i = 0; i < testValues.length; i++) {
    if (backtrack(1, operands[i].length, operands[i][0], testValues[i], i)) {
      totalCalibrationResult += testValues[i];
    }
  }

  return totalCalibrationResult;
}

const data: string = fs.readFileSync('./day07input.txt', 'utf-8');
// const data: string = fs.readFileSync('./day07sampleinput.txt', 'utf-8');
const lines = data.split('\n');
const testValues: number[] = [];
const operands: number[][] = [];
for (let i = 0; i < lines.length; i++) {
  const splitted = lines[i].split(': ');
  testValues.push(+splitted[0]);
  operands.push(splitted[1].split(' ').map((s) => +s));
}

console.log('part1()', part1());
console.log('part2()', part2());
