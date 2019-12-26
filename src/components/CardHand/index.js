import React from 'react';
import { View } from 'react-native';

import { Card } from '../';
import styles from './styles';

const CardHand = ({ cards, hidden = true }) => (
  <View style={styles.container}>
    {[1, 2, 3, 4].map((cardData, index) => (
      <Card key={index} hidden={hidden} />
    ))}
  </View>
);

export default CardHand;
