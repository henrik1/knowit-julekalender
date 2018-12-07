
const permutate = (head, tail) => {
  if (tail.length === 0) {
    return [[head]];
  } else {
    const tperms = permutate(tail[0],tail.slice(1));
    const pth = tperms.map(tc => [head].concat(tc));
    const wh = tperms.map(tperm => [parseInt(`${head}${tperm[0]}`)].concat(tperm.slice(1)));

    return pth.concat(wh);
  }
}

const solutions = (sum, t) => {
  if (t.length==0) {
    return sum==42 ? 1 : 0
  } else {
    return solutions(sum + t[0], t.slice(1)) + solutions(sum - t[0], t.slice(1));
  }
}

const input=[1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1]

const allSolutions =
  permutate(input[0], input.slice(1))
  .map(perm => solutions(perm[0], perm.slice(1)));

const max = allSolutions.reduce((prev, next) => prev + next, 0);;

console.log('RESULT', max);
