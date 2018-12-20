const fs = require("fs");
let input = fs.readFileSync('./input.spp', 'utf-8').split('\n');

const pop = (stack, count) => (
  { vals: stack.slice(0, count), rest: stack.slice(count) }
);
const sum = (arr) => [arr.reduce((prev, next) => (prev + next), 0)];
const abba = (a = 0, b = 0 ) => [ b - a, a - b ];
const axb = (a, b) => [a, a * b];
const adivb = (a, b) => ( [Math.floor(a/b)] );
const even = a => a % 2 === 0 ? [1] : [];
const odd = a => a % 2 !== 0 ? [a] : [];
const gt = arr => [ Math.max.apply(0, arr) ];

const fns = {
  " ": (stack) => { return [31].concat(stack); },
  ":": (stack) => { const res = sum(stack); return res; },
  "|": (stack) => { return [3].concat(stack) },
  "'": (stack) => {
    const { vals, rest } = pop(stack, 2);
    return sum(vals).concat(rest);
  },
  ".": (stack) => {
    const { vals, rest } = pop(stack, 2);
    return abba(vals[0], vals[1]).concat(rest);
  },
  "_": (stack) => {
    const { vals, rest } = pop(stack, 2);
    return axb(vals[0], vals[1]).concat(rest);
  },
  "/": (stack) => {
    const { rest } = pop(stack, 1);
    return rest;
  },
  "i": (stack) => {
    const { vals, rest } = pop(stack, 1);
    return vals.concat(stack);
  },
  "\\": (stack) => {
    const { vals, rest } = pop(stack, 1);
    return [vals[0]+1].concat(rest);
  },
  "*": (stack) => {
    const { vals, rest } = pop(stack, 2);
    return adivb(vals[0], vals[1]).concat(rest);
  },
  "]": (stack) => {
    const { vals, rest } = pop(stack, 1);
    return even(vals[0]).concat(rest);
  },
  "[": (stack) => {
    const { vals, rest } = pop(stack, 1);
    return odd(vals[0]).concat(rest);
  },
  "~": (stack) => {
    const { vals, rest } = pop(stack, 3);
    return gt(vals).concat(rest);
  }

}

let stack = [];

input.forEach((line) => {
  const tokens = line.split('');

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token === 'K') {
      break;
    }
    stack = fns[token](stack);
  }
});

console.log('RESULT', Math.max.apply(0, stack));
