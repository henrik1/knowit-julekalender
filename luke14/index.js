const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf-8').split('');

const solve = () => {
  let x = 0, y = 0;

  let x0 = 0, y0 = 0, xn = 0, yn = 0;

  const log = {};
  log[`${x},${y}`] = 1;

  for (let i = 0; i < input.length; i+=2) {
    const steps = parseInt(input.slice(i, i+1)[0]);
    const dir = input.slice(i+1, i+2)[0];

    switch (dir) {
      case 'H':
        for (let t = 1; t <= steps; t++)
          log[`${x+t},${y}`] = 1;
        x += steps;
        break;

      case 'V':
        for (let t = 1; t <= steps; t++)
          log[`${x-t},${y}`] = 1;
        x -= steps;
        break;

      case 'F':
        for (let t = 1; t <= steps; t++)
          log[`${x},${y+t}`] = 1;
        y += steps;
        break;

      case 'B':
        for (let t = 1; t <= steps; t++)
          log[`${x},${y-t}`] = 1;
        y -= steps;
        break;
    }

    x0 = Math.min(x0, x);
    xn = Math.max(xn, x);
    y0 = Math.min(y0, y);
    yn = Math.max(yn, y);
  }

  const asArray = Object.keys(log);
  return asArray.length / ((((xn - x0) + 1) * ((yn - y0) + 1)) - asArray.length);
}

const result = solve();

console.log('RESULT', result);
