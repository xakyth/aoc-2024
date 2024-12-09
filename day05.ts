import fs from 'node:fs';

function isValid(pages: number[]): boolean {
  let valid = true;
  for (let j = 0; j < pages.length && valid; j++) {
    for (let k = j + 1; k < pages.length; k++) {
      const after = beforeMap.get(pages[k]);
      if (after?.has(pages[j])) {
        valid = false;
        break;
      }
    }
  }
  return valid;
}

function part1(): number {
  let totalSum = 0;
  for (let i = 0; i < orderings.length; i++) {
    const pages = orderings[i];
    if (isValid(pages)) {
      totalSum += pages[Math.floor(pages.length / 2)];
    }
  }
  return totalSum;
}

function part2(): number {
  let totalSum = 0;
  for (let i = 0; i < orderings.length; i++) {
    if (isValid(orderings[i])) {
      continue;
    }
    const pages = new Set(orderings[i]);
    const rightOrder = new Array();
    while (pages.size > 0) {
      for (const page of pages) {
        let mostLeft = true;
        const before = afterMap.get(page);
        for (const p1 of pages) {
          if (before?.has(p1)) {
            mostLeft = false;
            break;
          }
        }
        if (mostLeft) {
          pages.delete(page);
          rightOrder.push(page);
          break;
        }
      }
    }
    totalSum += rightOrder[Math.floor(orderings[i].length / 2)];
  }
  return totalSum;
}

const data = fs.readFileSync('./day05input.txt', 'utf8').split('\n');
const beforeMap: Map<number, Set<number>> = new Map();
const afterMap: Map<number, Set<number>> = new Map();
let isMapping = true;
const orderings: number[][] = Array();

for (const line of data) {
  if (isMapping) {
    const splitted = line.split('|').map((s) => +s);
    if (splitted.length == 1) {
      isMapping = false;
      continue;
    }
    let beforeSet = beforeMap.get(splitted[0]);
    let afterSet = afterMap.get(splitted[1]);
    if (!beforeSet) {
      beforeSet = new Set();
    }
    if (!afterSet) {
      afterSet = new Set();
    }
    beforeSet.add(splitted[1]);
    afterSet.add(splitted[0]);
    beforeMap.set(splitted[0], beforeSet);
    afterMap.set(splitted[1], afterSet);
  } else {
    const splitted = line.split(',').map((s) => +s);
    orderings.push(splitted);
  }
}

console.log(part1());
console.log(part2());
