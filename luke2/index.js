const fs = require('fs');
const data = fs.readFileSync('./data.txt', 'utf-8').split('\n');

// Parsing data
const parseVector = (string) => {
  let pAdata = string.split(';')[0].replace('(', '').replace(')', '').split(',');
  let pBdata = string.split(';')[1].replace('(', '').replace(')', '').split(',');
  const p1 = { x: parseInt(pAdata[0], 10), y: parseInt(pAdata[1], 10) };
  const p2 = { x: parseInt(pBdata[0], 10), y: parseInt(pBdata[1], 10) };
  return [p1, p2];
}

// calculating slope
const calculateSlope = (p1, p2) => {
  const a = (p2.y - p1.y) / (p2.x - p1.x);
  return a;
}

const groups = {};

data.forEach((string) => {
  if (!string) {
    return;
  }

  const vector = parseVector(string);
  const slope = calculateSlope(vector[0], vector[1]);

  // Only care about parallel lines so we can use absolute value
  const absSlope = `${Math.abs(slope)}`;

  // Keep track of count for each slope
  groups[absSlope] = groups[absSlope] ? groups[absSlope] + 1 : 1;
});


const max = Object.keys(groups).reduce((prev, next) => (
  Math.max(prev, groups[next])
), 0);

console.log('Result:', max);
