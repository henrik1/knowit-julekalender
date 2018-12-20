const fs = require('fs');
const path = fs.readFileSync('input-crisscross.txt', 'utf-8').trim();

const directions = (coords = []) => ({
  H: (len) => (coords = [coords[0] + len, coords[1]]),
  V: (len) => (coords = [coords[0] - len, coords[1]]),
  F: (len) => (coords = [coords[0], coords[1] + len]),
  B: (len) => (coords = [coords[0], coords[1] - len]),
});

const solve = (path) => {
  let coords = [0,0];
  const step = directions(coords);

  for (let i = 0; i < path.length; i += 2) {
    const len = parseInt(path.substring(i, i + 1));
    const dir = path.substring(i + 1, i + 2);
    coords = step[dir](len);
  }
  return coords;
}

console.log('RESULT', solve(path));
