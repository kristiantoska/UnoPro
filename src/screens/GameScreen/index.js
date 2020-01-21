import React, { useRef, useReducer, useCallback, useEffect } from 'react';
import { Transitioning, Transition, set } from 'react-native-reanimated';

import {
  GameBackground,
  Player,
  CardPile,
  ColorPicker,
} from '../../components';
import { randomIntFromInterval } from '../../utils';
import GameStateReducer, {
  INIT_GAME_STATE,
  INIT_PLAYERS_STATE,
} from './reducer';
import styles from './styles';

const NUM_PLAYERS = 4;
const AI_ENABLED = false;

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" durationMs={200} />
    <Transition.In type="fade" durationMs={100} />
  </Transition.Sequence>
);
const GameScreen = () => {
  const [gameState, dispatch] = useReducer(GameStateReducer, INIT_GAME_STATE);
  const turnOrder = useRef(null);
  const cardDrawModifier = useRef(null);
  const cardDrawAmount = useRef(0);
  const tmpCard = useRef(null);

  // ENABLE ANIMATIONS
  const ref = useRef();
  ref.current && ref.current.animateNextTransition();

  const {
    turn,
    pileCards,
    lastCardValue,
    boardColor,
    players,
    colorPickerVisible,
    cardDrawnThisTurn,
  } = gameState;

  useEffect(() => {
    // GAME START
    dispatch({ type: 'INIT_GAME', payload: { NUM_PLAYERS } });
    turnOrder.current = Object.keys(INIT_PLAYERS_STATE).slice(0, NUM_PLAYERS);
  }, []);

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
          } else if (AI_ENABLED && turn !== 'p1') {
            aiMove(nextPossibleMoves);
          }
        },
      },
    });
  }, [turn, activeCardFilter, throwCard, aiMove]);

  const beforeNextTurn = useCallback(() => {
    setTimeout(() => {
      const possibleMoves = players[turn].filter(activeCardFilter);

      if (possibleMoves.length === 0) {
        drawCard();
      } else if (AI_ENABLED && turn !== 'p1') {
        aiMove(possibleMoves);
      }
    }, 500);
  }, [players, turn, activeCardFilter, drawCard, aiMove]);

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
        ref.current.setNativeProps({ pointerEvents: 'auto' });
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
        ref.current.setNativeProps({ pointerEvents: 'none' });
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

  const areTurnsReversed = turnOrder.current
    ? turnOrder.current[0] > turnOrder.current[1]
    : false;

  return (
    <Transitioning.View
      ref={ref}
      style={styles.container}
      transition={transition}
    >
      <GameBackground
        boardColor={boardColor}
        turnsReversed={areTurnsReversed}
        cardDrawnThisTurn={cardDrawnThisTurn}
        drawCard={drawCard}
      />

      <CardPile pileCards={pileCards} />

      <Player
        position="bottom"
        cards={players.p1}
        hasTurn={turn === 'p1'}
        active
        {...{ activeCardFilter, onCardClick }}
      />

      {NUM_PLAYERS > 2 && (
        <Player
          position="left"
          cards={players.p2}
          hasTurn={turn === 'p2'}
          active={!AI_ENABLED}
          {...{ activeCardFilter, onCardClick }}
        />
      )}

      <Player
        position="top"
        cards={NUM_PLAYERS === 2 ? players.p2 : players.p3}
        hasTurn={turn === (NUM_PLAYERS === 2 ? 'p2' : 'p3')}
        active={!AI_ENABLED}
        {...{ activeCardFilter, onCardClick }}
      />

      {NUM_PLAYERS === 4 && (
        <Player
          position="right"
          cards={players.p4}
          hasTurn={turn === 'p4'}
          active={!AI_ENABLED}
          {...{ activeCardFilter, onCardClick }}
        />
      )}

      <ColorPicker visible={colorPickerVisible} onColorClick={onColorPick} />
    </Transitioning.View>
  );
};

export default GameScreen;
