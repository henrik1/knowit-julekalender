const jimp = require('jimp');

const URL = 'https://s3-eu-west-1.amazonaws.com/knowit-julekalender-2018/input-pokemon-jakt.png';

const SIGNIFICANT_BITS = 4;
const BYTE = 8;
const INSIGNIFICANT_BITS = BYTE-SIGNIFICANT_BITS;

const pad = (start, count) => (
  `${start}${new Array(count-start.length).fill('0').join('')}`
)

const process = (picture, fn) => {
  let maxValue = 0;
  for (let i = 0; i < picture.bitmap.data.length; i+=4) {
    // We can skip changing the alpha channel
    for (let j = 0; j < 4; j++) {
      maxValue = Math.max(maxValue, picture.bitmap.data[i + j]);
      picture.bitmap.data[i + j] = fn(picture.bitmap.data[i + j]);
    }
  }
}

const removeSignificantBits = (picture) => {
  process(picture, (value) => {
    const binary = pad(value.toString(2), BYTE);
    const removed = `${pad('', INSIGNIFICANT_BITS)}${binary.slice(INSIGNIFICANT_BITS)}`;
    const number = parseInt(removed, 2);
    return number;
  });
}

const normalize = (picture) => {
  let max = 0;
  let min = 255;
  process(picture, (value) => {
    max = Math.max(value, max);
    min = Math.min(value, min);
    return value;
  });

  const range = max - min;
  const modifier = 255 / range;

  process(picture, (value) => {
    return value * modifier;
  });
}


const reveal = async () => {
  const picture = await jimp.read(URL);

  removeSignificantBits(picture);
  normalize(picture);

  picture.write(`${new Date().getTime()}.png`);
}

reveal();
