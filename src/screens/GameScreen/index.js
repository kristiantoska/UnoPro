import React, { useRef, useReducer, useCallback, useEffect } from 'react';
import { Transitioning, Transition } from 'react-native-reanimated';

import {
  GameBackground,
  Player,
  CardPile,
  ColorPicker,
} from '../../components';
import GameStateReducer, {
  INIT_GAME_STATE,
  INIT_PLAYERS_STATE,
} from './reducer';
import styles from './styles';

const NUM_PLAYERS = 4;

const transition = (
  <Transition.Sequence>
    <Transition.Out type="scale" durationMs={150} />
    <Transition.Change interpolation="easeInOut" durationMs={200} />
    <Transition.In type="fade" durationMs={100} />
  </Transition.Sequence>
);
const GameScreen = () => {
  const [gameState, dispatch] = useReducer(GameStateReducer, INIT_GAME_STATE);
  const turnOrder = useRef(null);
  const currentTurnName = useRef('p1');
  const cardDrawModifier = useRef(null);
  const cardDrawAmount = useRef(0);
  const tmpCard = useRef(null);
  const ref = useRef();

  const {
    turn,
    pileCards,
    lastCardValue,
    boardColor,
    players,
    colorPickerVisible,
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

  const throwCard = useCallback((card, newBoardColor) => {
    ref.current && ref.current.animateNextTransition();

    const currentTurn = turnOrder.current.findIndex(
      el => el === currentTurnName.current,
    );
    let nextTurn =
      turnOrder.current[(currentTurn + 1) % turnOrder.current.length];

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

    dispatch({
      type: 'THROW_CARD',
      payload: {
        newTurn: nextTurn,
        cardData: card,
        newBoardColor,
      },
    });
    tmpCard.current = null;
    currentTurnName.current = nextTurn;
  }, []);

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
          position="right"
          cards={players.p2}
          hasTurn={turn === 'p2'}
          active
          {...{ activeCardFilter, onCardClick }}
        />
      )}

      <Player
        position="top"
        cards={NUM_PLAYERS === 2 ? players.p2 : players.p3}
        hasTurn={turn === (NUM_PLAYERS === 2 ? 'p2' : 'p3')}
        active
        {...{ activeCardFilter, onCardClick }}
      />

      {NUM_PLAYERS === 4 && (
        <Player
          position="left"
          cards={players.p4}
          hasTurn={turn === 'p4'}
          active
          {...{ activeCardFilter, onCardClick }}
        />
      )}

      <ColorPicker visible={colorPickerVisible} onColorClick={onColorPick} />
    </Transitioning.View>
  );
};

export default GameScreen;
