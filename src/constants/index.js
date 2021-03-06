const CARD_RATIO = 1.5875;
const DECK_LENGTH = 108;
const COLORS = {
  white: '#ffffff',
  red: '#EC1A23',
  yellow: '#FEDE01',
  green: '#00A54F',
  blue: '#0194D9',
  black: '#000000',
};

const fullDeck = () => {
  const numbers = new Array(9).fill(0).map((el, i) => i + 1);
  const colors = ['red', 'yellow', 'green', 'blue'];
  const deck = [];

  for (let i = 0; i < colors.length; i++) {
    // add 0
    deck.push({ color: colors[i], value: 0, key: 0 });

    // add 1-9
    for (let j = 0; j < numbers.length; j++) {
      deck.push({ color: colors[i], value: numbers[j], key: 0 });
    }

    for (let j = 0; j < numbers.length; j++) {
      deck.push({ color: colors[i], value: numbers[j], key: 1 });
    }

    // add special
    for (let j = 0; j < 2; j++) {
      deck.push({ color: colors[i], value: 'reverse', key: j });
    }

    for (let j = 0; j < 2; j++) {
      deck.push({ color: colors[i], value: 'skip', key: j });
    }

    for (let j = 0; j < 2; j++) {
      deck.push({ color: colors[i], value: 'draw2', key: j });
    }
  }

  // add wild
  for (let j = 0; j < 4; j++) {
    deck.push({ color: 'black', value: 'wild', key: j });
  }

  for (let j = 0; j < 4; j++) {
    deck.push({ color: 'black', value: 'wildDraw4', key: j });
  }

  return deck;
};

export { fullDeck, DECK_LENGTH, CARD_RATIO, COLORS };
