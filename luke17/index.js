
const fs = require("fs");
let input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(s => {
  let coords = s.split(',');
  return {
    x: parseFloat(coords[0], 10),
    y: parseFloat(coords[1], 10)
  }
});
input.splice(input.length-1, 1);

const calcDistance = (a, b) => (
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
);

const solve = (list, prev = null) => {
  let minDistance = 999999;

  if (list.length === 0) {
    return 0;
  }

  list.forEach((next, idx) => {
    const nextDistance = !prev ? 0 : calcDistance(prev, next);
    const nextList = list.slice();

    nextList.splice(idx, 1);
    minDistance = Math.min(solve(nextList, list[idx]) + nextDistance, minDistance);
  });

  return minDistance;
}

console.log('RESULT', Math.round(solve(input)));
