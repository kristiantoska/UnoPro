import React, { useReducer, useCallback } from 'react';
import { View } from 'react-native';

import { fullDeck } from '../../constants';
import { GameBackground, Player, CardPile } from '../../components';
import GameStateReducer, { INITIAL_GAME_STATE } from './reducer';
import styles from './styles';

const GameScreen = () => {
  const [gameState, dispatch] = useReducer(
    GameStateReducer,
    INITIAL_GAME_STATE,
  );
  const deck = fullDeck();

  const { lastCardValue, boardColor } = gameState;

  const activeCardFilter = useCallback(
    card =>
      lastCardValue === null ||
      card.value === lastCardValue ||
      card.color === boardColor ||
      card.color === 'black',
    [lastCardValue, boardColor],
  );

  return (
    <View style={styles.container}>
      <GameBackground />

      <CardPile />

      <Player
        position="bottom"
        active
        hasTurn
        cards={[
          { value: 'wildDraw4', color: 'black' },
          { value: 'draw2', color: 'red' },
          { value: 'reverse', color: 'red' },
          { value: 'skip', color: 'red' },
          { value: 'wild', color: 'black' },
        ]}
        {...{ activeCardFilter }}
      />

      <Player
        position="right"
        cards={deck.slice(0, 5)}
        {...{ activeCardFilter }}
      />

      <Player
        position="top"
        cards={deck.slice(0, 5)}
        {...{ activeCardFilter }}
      />

      <Player
        position="left"
        cards={deck.slice(0, 5)}
        {...{ activeCardFilter }}
      />
    </View>
  );
};

export default GameScreen;
