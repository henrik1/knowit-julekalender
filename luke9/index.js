const md5 = require('md5');
const input = require('./input');

const solve = (list, prevHash) => {
  for (let i = 0; i < list.length; i++) {
    if (md5(`${prevHash}${list[i].ch}`) === list[i].hash) {
      return [list[i].ch].concat(
        solve(list.slice(0, i).concat(list.slice(i+1)), list[i].hash)
      )
    };
  }
  return '';
}

const result = solve(input, md5("julekalender")).join('');
console.log(result);
