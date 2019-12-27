const CARD_RATIO = 1.5875;
const DECK_LENGTH = 108;

const fullDeck = () => {
  const numbers = new Array(9).fill(0).map((el, i) => i + 1);
  const colors = ['red', 'yellow', 'green', 'blue'];
  const deck = [];

  for (let i = 0; i < colors.length; i++) {
    // add 0
    deck.push({ color: colors[i], value: 0 });

    // add 1-9
    for (let j = 0; j < numbers.length; j++) {
      deck.push({ color: colors[i], value: numbers[j] });
    }

    for (let j = 0; j < numbers.length; j++) {
      deck.push({ color: colors[i], value: numbers[j] });
    }

    // add special
    for (let j = 0; j < 2; j++) {
      deck.push({ color: colors[i], value: 'reverse' });
    }

    for (let j = 0; j < 2; j++) {
      deck.push({ color: colors[i], value: 'skip' });
    }

    for (let j = 0; j < 2; j++) {
      deck.push({ color: colors[i], value: 'draw2' });
    }
  }

  // add wild
  for (let j = 0; j < 4; j++) {
    deck.push({ color: 'black', value: 'wild' });
  }

  for (let j = 0; j < 4; j++) {
    deck.push({ color: 'black', value: 'wildDraw4' });
  }

  return deck;
};

export { fullDeck, DECK_LENGTH, CARD_RATIO };
