const rules = require('./rules');
const fs = require("fs");
const input = fs.readFileSync('./input.txt', 'utf-8').trim();

const solve = (log, players = {}) => {
  let result = { 0: 0, 1: 0, 2: 0 };

  let next = log.slice(0, 3);
  let rest = log.slice(3);
  let nextPlayers = { ...players };

  while (next.length) {
    const nextRes = rules[next];
    if (nextRes.winner !== undefined) {
      result[nextPlayers[nextRes.winner].idx] = ++result[nextPlayers[nextRes.winner].idx];
      next = rest.slice(0, 3);
      rest = rest.slice(3);
      nextPlayers = { ...players };
    } else if (nextRes.draw && nextRes.draw.length === 3) {
      next = rest.slice(0, 3);
      rest = rest.slice(3);
      nextPlayers = { ...players };
    } else if (nextRes.draw && nextRes.draw.length === 2) {
      nextPlayers = { 0: nextPlayers[nextRes.draw[0]], 1: nextPlayers[nextRes.draw[1]] };
      next = rest.slice(0, 2);
      rest = rest.slice(2);
    }
  }

  return result;
}

const score = solve(input, { 0: { idx: 0 }, 1: { idx: 1 }, 2: { idx: 2 } });

console.log(score);
