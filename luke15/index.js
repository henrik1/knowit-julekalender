
const fs = require("fs");
let input = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(p => (
  parseInt(p.slice(p.indexOf('.') + 1), 10)
));

input = input.slice(0, input.length-1);

const hasGoldBirthdate = (f) => {
  let age = Math.floor(Math.sqrt(f));
  let sq = Math.sqrt(f + age);

  while (sq >= age) {
    if (age === sq) return true;
    age++;
    sq = Math.sqrt(f + age);
  }

  return false;
}

const solve = (arr) => {
  let counter = 0;
  arr.forEach((y) => {
    counter += hasGoldBirthdate(y) ? 1 : 0;
  });
  return counter;
}

console.log(solve(input));
