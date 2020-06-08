import seedrandom from 'seedrandom';

const D_X = 18;
const D_Y = 18;
const D_ANGLE = 90;

let rng = seedrandom();

export const setRandomSeed = seed => {
  rng = seedrandom(seed);
};

export const isSameCard = (c1, c2) =>
  c1.value === c2.value && c1.color === c2.color && c1.key === c2.key;

export const randomIntFromInterval = (min, max) => {
  return Math.floor(rng() * (max - min + 1) + min);
};

export function getRandomPileCardPosition() {
  return {
    translateX: randomIntFromInterval(0, 2 * D_X) - D_X,
    translateY: randomIntFromInterval(0, 2 * D_Y) - D_Y,
    rotate: randomIntFromInterval(0, 2 * D_ANGLE) - D_ANGLE,
  };
}
