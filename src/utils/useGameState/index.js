import { useRef, useCallback, useEffect, useReducer } from 'react';
import { randomIntFromInterval } from '../../utils';
import GameStateReducer, {
  INIT_GAME_STATE,
  INIT_PLAYERS_STATE,
} from './reducer';

const useGameState = ({ containerRef, numPlayers, aiEnabled }) => {
  const [gameState, dispatch] = useReducer(GameStateReducer, INIT_GAME_STATE);

  const cardDrawModifier = useRef(null);
  const cardDrawAmount = useRef(0);
  const tmpCard = useRef(null);
  const turnOrder = useRef(null);

  const { turn, lastCardValue, boardColor, players } = gameState;

  const areTurnsReversed = turnOrder.current
    ? turnOrder.current[0] > turnOrder.current[1]
    : false;

  useEffect(() => {
    // GAME START
    dispatch({ type: 'INIT_GAME', payload: { numPlayers } });
    turnOrder.current = Object.keys(INIT_PLAYERS_STATE).slice(0, numPlayers);
  }, [numPlayers]);

  const activeCardFilter = useCallback(
    card =>
      lastCardValue === null ||
      card.value === lastCardValue ||
      card.color === boardColor ||
      card.color === 'black',
    [lastCardValue, boardColor],
  );

  const drawCard = useCallback(() => {
    dispatch({
      type: 'DRAW_CARD',
      payload: {
        player: turn,
        afterDraw: newCards => {
          const nextPossibleMoves = newCards.filter(activeCardFilter);
          if (nextPossibleMoves.length === 0) {
            setTimeout(() => {
              throwCard(null);
            }, 700);
          } else if (aiEnabled && turn !== 'p1') {
            aiMove(nextPossibleMoves);
          }
        },
      },
    });
  }, [turn, activeCardFilter, throwCard, aiMove, aiEnabled]);

  const beforeNextTurn = useCallback(() => {
    setTimeout(() => {
      const possibleMoves = players[turn].filter(activeCardFilter);

      if (possibleMoves.length === 0) {
        drawCard();
      } else if (aiEnabled && turn !== 'p1') {
        aiMove(possibleMoves);
      }
    }, 500);
  }, [players, turn, activeCardFilter, drawCard, aiMove, aiEnabled]);

  useEffect(() => {
    if (turn !== null) {
      beforeNextTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn]);

  const drawCards = useCallback((amount, player, endCallback) => {
    if (amount === 0) {
      endCallback();
    } else {
      dispatch({
        type: 'DRAW_CARD',
        payload: { player },
      });

      setTimeout(() => drawCards(amount - 1, player, endCallback), 400);
    }
  }, []);

  const throwCard = useCallback(
    (card, newBoardColor) => {
      const savedTurn = turn;
      const currentTurn = turnOrder.current.findIndex(el => el === turn);
      let nextTurn =
        turnOrder.current[(currentTurn + 1) % turnOrder.current.length];

      if (card !== null) {
        // MANAGE special cards
        if (card.value === 'reverse') {
          nextTurn =
            turnOrder.current[
              (currentTurn + turnOrder.current.length - 1) %
                turnOrder.current.length
            ];
          turnOrder.current = turnOrder.current.reverse();
        } else if (card.value === 'skip') {
          nextTurn =
            turnOrder.current[
              (currentTurn + turnOrder.current.length + 2) %
                turnOrder.current.length
            ];
        } else if (card.value === 'draw2') {
          cardDrawModifier.current = 'draw2';
          cardDrawAmount.current += 2;
        } else if (card.value === 'wildDraw4') {
          cardDrawModifier.current = 'wildDraw4';
          cardDrawAmount.current += 4;
        }
      }

      const endTurn = () => {
        containerRef.current.setNativeProps({ pointerEvents: 'auto' });
        dispatch({
          type: 'THROW_CARD',
          payload: {
            newTurn: nextTurn,
            cardData: card,
            newBoardColor,
          },
        });
      };

      // MANAGE +2 +4 stacking/draw
      if (
        cardDrawModifier.current !== null &&
        (card === null ||
          (card.value !== 'draw2' && card.value !== 'wildDraw4'))
      ) {
        containerRef.current.setNativeProps({ pointerEvents: 'none' });
        drawCards(cardDrawAmount.current, savedTurn, endTurn);

        cardDrawModifier.current = null;
        cardDrawAmount.current = 0;
      } else {
        endTurn();
      }
    },
    [turn, drawCards],
  );

  const aiMove = useCallback(
    possibleMoves => {
      const aiCard =
        possibleMoves[randomIntFromInterval(0, possibleMoves.length - 1)];

      setTimeout(
        () =>
          throwCard(aiCard, aiCard.color !== 'black' ? aiCard.color : 'red'),
        400,
      );
    },
    [throwCard],
  );

  const onCardClick = useCallback(
    card => {
      if (card.value === 'wildDraw4' || card.value === 'wild') {
        dispatch({ type: 'TOGGLE_COLOR_PICKER', payload: { visible: true } });
        tmpCard.current = card;
      } else {
        throwCard(card, card.color);
      }
    },
    [throwCard],
  );

  const onColorPick = useCallback(
    pickedColor => {
      dispatch({
        type: 'TOGGLE_COLOR_PICKER',
        payload: { visible: false },
      });
      throwCard(tmpCard.current, pickedColor);
    },
    [throwCard],
  );

  return [
    gameState,
    { drawCard, activeCardFilter, onCardClick, onColorPick },
    areTurnsReversed,
  ];
};

export default useGameState;
