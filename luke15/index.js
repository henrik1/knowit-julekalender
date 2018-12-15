
const fs = require("fs");
let input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(p => (
  parseInt(p.slice(p.indexOf('.') + 1), 10)
));

input = input.slice(0, input.length-1);

const solve = (arr) => {
  let counter = 0;
  arr.forEach((f) => {
    let age = Math.floor(Math.sqrt(f));
    let sq = Math.sqrt(f + age);

    while (sq >= age) {
      if (age === sq) return ++counter;
      age++;
      sq = Math.sqrt(f + age);
    }
  });
  return counter;
}

console.log('RESULT', solve(input));
