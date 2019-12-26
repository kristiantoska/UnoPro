import React from 'react';
import { View } from 'react-native';

import styles from './styles';
import { GameBackground, Player } from '../../components';

const GameScreen = () => (
  <View style={styles.container}>
    <GameBackground />

    <Player position="bottom" active />
    <Player position="right" />
    <Player position="top" />
    <Player position="left" />
  </View>
);

export default GameScreen;
