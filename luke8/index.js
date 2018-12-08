const fs = require("fs");
let input = fs.readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map(r => (
    { c: r.split(',')[0], d: parseInt(r.split(',')[1], 10) }
  ));
input = input.slice(0, input.length-1);

const groups = {};

input.forEach((item, val) => {
  groups[item.d] = groups[item.d] ? groups[item.d].concat(item) : [item];
});

const result = [];

Object.values(groups).reduce((prev, next) => {
  if (prev === null) {
    result.push(next);
    return next;
  } else if ((next.length > 1 && next.filter(doll => doll.c !== prev[0].c).length > 0) ||
            (prev.length > 1 && prev.filter(doll => doll.c !== next[0].c).length > 0)) {
    result.push(next);
    return next;
  } else if (next[0].c !== prev[0].c) {
    result.push(next);
    return next;
  }
  return prev;
}, null);

console.log('RESULT', result.length);
