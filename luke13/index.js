
const isPrime = num => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
    if(num % i === 0) return false;
  return num !== 1 && num !== 0;
}

const isValid = (number, seq) => {
  let count = [];

  for (let i = 0; i < seq.length; i++) {
    for (let j = seq.length-1; j > i; j--) {
      if (seq[i] + seq[j] === number) count++;
    }
  }
  return count === 1;
}

const solve = (base) => {
  const primes = [ 3 ];
  const seq = [ ...base ];

  let next = seq[seq.length-1] + 1;

  while(primes.length < 100) {
    if (isValid(next, seq)) {
      seq.push(next);

      if (isPrime(next)) {
        primes.push(next);
      }
    }
    next++;
  }

  let sum = 0;
  primes.forEach(p => { sum += p });
  return sum;
}

const res = solve([1, 3]);

console.log(res);
