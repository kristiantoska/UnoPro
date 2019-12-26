import React from 'react';
import { View, Image } from 'react-native';

import styles from './styles';
import backgroundImage from '../../assets/images/background.jpg';

const GameBackground = () => (
  <View style={styles.container}>
    <Image source={backgroundImage} style={styles.backgroundImage} />
  </View>
);

export default GameBackground;
