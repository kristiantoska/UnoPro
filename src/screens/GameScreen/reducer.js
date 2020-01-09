import { fullDeck } from '../../constants';
import { randomIntFromInterval, getRandomPileCardPosition } from '../../utils';

const MAX_PILE_HEIGHT = 15;

export const INITIAL_GAME_STATE = {
  lastCardValue: null,
  boardColor: null,
  deck: fullDeck(),
  pileCards: [],
  players: {
    p1: [],
    p2: [],
    p3: [],
    p4: [],
  },
  gameOrder: ['p1', 'p2', 'p3', 'p4'],
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'INIT_GAME':
      const { numPlayers } = action.payload;
      const activePlayers = Object.keys(state.players).slice(0, numPlayers);

      let tmpDeck = [...state.deck];
      const tmpPlayers = {};

      activePlayers.forEach(player => {
        tmpPlayers[player] = [];

        for (let i = 0; i < 5; i++) {
          const nextCardIndex = randomIntFromInterval(0, tmpDeck.length - 1);

          tmpPlayers[player].push(tmpDeck[nextCardIndex]);
          tmpDeck = tmpDeck.filter((el, j) => j !== nextCardIndex);
        }
      });

      return {
        ...state,
        players: tmpPlayers,
        gameOrder: activePlayers,
        deck: tmpDeck,
      };
    case 'ADD_CARD_TO_PILE':
      const { cardData, newBoardColor } = action.payload;

      return {
        ...state,
        lastCardValue: cardData.value,
        boardColor: newBoardColor,
        pileCards: [
          ...state.pileCards.slice(
            Math.max(0, state.pileCards.length - 1 - MAX_PILE_HEIGHT),
            state.pileCards.length,
          ),
          {
            cardData: cardData,
            positionData: getRandomPileCardPosition(),
          },
        ],
      };
    default:
      throw new Error();
  }
}
