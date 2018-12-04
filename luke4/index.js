const jimp = require('jimp');

const URL = 'https://s3-eu-west-1.amazonaws.com/knowit-julekalender-2018/input-pokemon-jakt.png';

const BITS = 4;
const BYTE = 8;

const intToBinary = (integer) => {
  if( typeof(integer) !== 'number') return NaN;
  return integer.toString(2);
}

const getZeros = (count) => {
  const zeroArray = new Array(count);
  zeroArray.fill('0');
  return zeroArray.join('');
}

const process = (picture, fn) => {
  let maxValue = 0;
  for (let i = 0; i < picture.bitmap.data.length; i+=4) {
    // We skip changing the alpha channel
    for (let j = 0; j < 4; j++) {
      maxValue = Math.max(maxValue, picture.bitmap.data[i + j]);
      picture.bitmap.data[i + j] = fn(picture.bitmap.data[i + j]);
    }
  }
}

const removeSignificantBits = (picture) => {
  process(picture, (value) => {
    const binary = intToBinary(value);
    const removed = `${getZeros(BYTE - BITS)}${binary.slice(BYTE - BITS)}`;
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
