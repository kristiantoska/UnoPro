import { fullDeck } from '../../constants';
import {
  isSameCard,
  randomIntFromInterval,
  getRandomPileCardPosition,
} from '../../utils';

const MAX_PILE_HEIGHT = 20;
const START_HAND_CARDS = 7;

export const INIT_PLAYERS_STATE = {
  p1: [],
  p2: [],
  p3: [],
  p4: [],
};
export const INIT_GAME_STATE = {
  turn: null,
  lastCardValue: null,
  boardColor: null,
  deck: fullDeck(),
  pileCards: [],
  players: INIT_PLAYERS_STATE,
  colorPickerVisible: false,
  cardDrawnThisTurn: false,
};

export default function reducer(state, action) {
  switch (action.type) {
    case 'INIT_GAME':
      return initGame(state, action);
    case 'THROW_CARD':
      return throwCard(state, action);
    case 'DRAW_CARD':
      return drawCard(state, action);
    case 'TOGGLE_COLOR_PICKER':
      return { ...state, colorPickerVisible: action.payload.visible };

    default:
      return state;
  }
}

const initGame = (state, action) => {
  const { numPlayers } = action.payload;
  const activePlayers = Object.keys(state.players).slice(0, numPlayers);

  let tmpDeck = [...state.deck];
  const tmpPlayers = {};

  // Fill player hands
  activePlayers.forEach(player => {
    tmpPlayers[player] = [];

    for (let i = 0; i < START_HAND_CARDS; i++) {
      const nextCardIndex = randomIntFromInterval(0, tmpDeck.length - 1);

      tmpPlayers[player].push(tmpDeck[nextCardIndex]);
      tmpDeck = tmpDeck.filter((el, j) => j !== nextCardIndex);
    }
  });

  // Throw first card
  let firstCardIndex = null;
  while (firstCardIndex === null || isNaN(tmpDeck[firstCardIndex].value)) {
    firstCardIndex = randomIntFromInterval(0, tmpDeck.length - 1);
  }
  const firstCard = tmpDeck[firstCardIndex];
  tmpDeck = tmpDeck.filter((el, j) => j !== firstCardIndex);

  return {
    ...state,
    turn: 'p1',
    pileCards: [
      { cardData: firstCard, positionData: getRandomPileCardPosition() },
    ],
    lastCardValue: firstCard.value,
    boardColor: firstCard.color,
    players: tmpPlayers,
    deck: tmpDeck,
  };
};

const throwCard = (state, action) => {
  const { turn, players } = state;
  const { newTurn, cardData, newBoardColor } = action.payload;

  if (cardData === null) {
    return { ...state, cardDrawnThisTurn: false, turn: newTurn };
  }

  return {
    ...state,
    cardDrawnThisTurn: false,
    boardDisabled: false,
    turn: newTurn,
    players: {
      ...players,
      [turn]: players[state.turn].filter(el => !isSameCard(el, cardData)),
    },
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
  // state.pileCards.slice(
  //         Math.max(0, state.pileCards.length - 1 - MAX_PILE_HEIGHT),
  //         state.pileCards.length,
  //       )
};

const drawCard = (state, action) => {
  const { player, afterDraw } = action.payload;
  const { deck, players } = state;
  const tmpPlayers = { ...players };
  let tmpDeck = [...deck];

  const nextCardIndex = randomIntFromInterval(0, tmpDeck.length - 1);

  tmpPlayers[player] = [...tmpPlayers[player], tmpDeck[nextCardIndex]];
  tmpDeck = tmpDeck.filter((el, j) => j !== nextCardIndex);

  afterDraw && afterDraw(tmpPlayers[player]);

  return {
    ...state,
    cardDrawnThisTurn: true,
    deck: tmpDeck,
    players: tmpPlayers,
  };
};
