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

      <Player position="bottom" active cards={deck.slice(0, 5)} />
      <Player position="right" cards={deck.slice(0, 5)} />
      <Player position="top" cards={deck.slice(0, 5)} />
      <Player position="left" cards={deck.slice(0, 5)} />
    </View>
  );
};

export default GameScreen;
