const CARD_RATIO = 1.5875;
const DECK_LENGTH = 108;

const basicCardsPerColor = new Array(10).fill(0).reduce(
  // 1 card per '0' and 2 for numbers '1 - 9'
  (acc, cur, index) => ({
    ...acc,
    [index]: index === 0 ? 1 : 2,
  }),
  {
    reverse: 2,
    draw2: 2,
    skip: 2,
  },
);

const FULL_DECK = {
  red: basicCardsPerColor,
  yellow: basicCardsPerColor,
  green: basicCardsPerColor,
  blue: basicCardsPerColor,
  black: {
    wild: 4,
    wildDraw4: 4,
  },
};

export { FULL_DECK, DECK_LENGTH, CARD_RATIO };
