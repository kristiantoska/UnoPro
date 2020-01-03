import React from 'react';
import { View } from 'react-native';

import { fullDeck } from '../../constants';
import { GameBackground, Player } from '../../components';
import styles from './styles';

const GameScreen = () => {
  const deck = fullDeck();

  return (
    <View style={styles.container}>
      <GameBackground />

      <Player
        position="bottom"
        active
        cards={[
          { value: 'wildDraw4', color: 'black' },
          { value: 'draw2', color: 'red' },
          { value: 'reverse', color: 'red' },
          { value: 'skip', color: 'red' },
          { value: 'wild', color: 'black' },
        ]}
      />
      <Player position="right" cards={deck.slice(0, 5)} />
      <Player position="top" cards={deck.slice(0, 5)} />
      <Player position="left" cards={deck.slice(0, 5)} />
    </View>
  );
};

export default GameScreen;
