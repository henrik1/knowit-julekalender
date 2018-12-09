const md5 = require('md5');
const input = require('./input');

const solve = (list, prevHash) => {
  for (let i = 0; i < list.length; i++) {
    if (md5(`${prevHash}${list[i].ch}`) === list[i].hash) {
      const next = list[i];
      list.splice(i, 1)
      return [next.ch].concat(
        solve(list, next.hash)
      )
    };
  }
  return '';
}

const result = solve(input, md5("julekalender")).join('');
console.log(result);
