import fs from 'node:fs';

function part1(data: string) {
  const lines = data.split(/\n/);
  let safeReports = 0;
  for (const line of lines) {
    const levels: number[] = line.split(' ').map((s) => +s);
    let isIncreasing = null;
    for (let i = 0; i < levels.length; i++) {
      if (i == levels.length - 1) {
        safeReports++;
        break;
      }
      const diff = levels[i] - levels[i + 1];
      if (isIncreasing == null) {
        isIncreasing = diff < 0 ? true : false;
      }
      if (isIncreasing) {
        if (diff > -1 || diff < -3) {
          break;
        }
      } else {
        if (diff < 1 || diff > 3) {
          break;
        }
      }
    }
  }
  return safeReports;
}

function part2(data: string): number {
  function inBounds(diff: number): boolean {
    return diff >= 1 && diff <= 3;
  }
  function checkReport(levels: number[], isIncreasing: boolean): boolean {
    let canRemove = true;
    for (let i = 0; i < levels.length; i++) {
      if (i == levels.length - 1) {
        return true;
      }
      let diff = isIncreasing
        ? levels[i + 1] - levels[i]
        : levels[i] - levels[i + 1];
      if (!inBounds(diff) && canRemove) {
        canRemove = false;
        if (i + 2 < levels.length) {
          const diff2 = isIncreasing
            ? levels[i + 2] - levels[i]
            : levels[i] - levels[i + 2];
          if (inBounds(diff2)) {
            i++;
          } else {
            if (i > 0) {
              const diff3 = isIncreasing
                ? levels[i + 1] - levels[i - 1]
                : levels[i - 1] - levels[i + 1];
              if (!inBounds(diff3)) {
                return false;
              }
            }
          }
        } else {
          i++;
        }
      } else if (!inBounds(diff) && !canRemove) {
        return false;
      }
    }
    return true;
  }

  const lines = data.split(/\n/);
  let safeReports = 0;
  for (const line of lines) {
    const levels: number[] = line.split(' ').map((s) => +s);
    const safeInc = checkReport(levels, true);
    const safeDec = checkReport(levels, false);
    if (safeInc) {
      safeReports++;
    }
    if (safeDec) {
      safeReports++;
    }
  }
  return safeReports;
}

const data: string = fs.readFileSync('./day02input.txt', 'utf-8');

console.log(part1(data));
console.log(part2(data));
