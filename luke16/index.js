const fs = require("fs");
let input = fs.readFileSync('./input.txt', 'utf-8').split(',').map(p => (
  parseInt(p, 10)
));

const isPrime = num => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
    if(num % i === 0) return false;
  return num !== 1 && num !== 0;
}

const getMaxPrimePalindrom = (list, idx) => {
  let max = 0;
  let sum = list[idx];

  for (let i = 1; i < list.length / 2; i++) {
    if (idx - i < 0 || idx + i > list.length - 1 || list[idx-i] !== list[idx+i]) {
      break;
    }

    sum += list[idx-i] + list[idx+i];

    if (isPrime(sum)) {
      max = sum;
    }
  }
  return max;
}

const solve = (numbers) => {
  let max = 0;
  numbers.forEach((number, idx) => {
    const next = getMaxPrimePalindrom(numbers, idx);
    max = Math.max(max, next);
  });
  return max;
}


console.log('RESULT', solve(input));
