import { fullDeck } from '../../constants';
import { getRandomPileCardPosition } from '../../utils/cardPile';

const MAX_PILE_HEIGHT = 14;

export const INITIAL_GAME_STATE = {
  lastCardValue: null,
  boardColor: null,
  deck: fullDeck(),
  pileCards: [],
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'ADD_CARD_TO_PILE':
      return {
        ...state,
        pileCards: [
          ...state.pileCards.slice(
            Math.max(0, state.pileCards.length - 1 - MAX_PILE_HEIGHT),
            state.pileCards.length,
          ),
          {
            cardData: action.payload,
            positionData: getRandomPileCardPosition(),
          },
        ],
      };
    default:
      throw new Error();
  }
}
