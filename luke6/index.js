const START = 1;
const END = 18163106;

let sum = 0;
for(let i = START; i < END; i++) {
  const next = `${i}`.split('').sort();
  if (next[Math.floor((next.length / 2))] === '0') {
    sum+=i;
  }
}

console.log(sum);
