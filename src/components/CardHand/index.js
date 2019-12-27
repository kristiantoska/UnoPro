import React from 'react';
import { View } from 'react-native';

import { Card } from '../';
import styles from './styles';

const CardHand = ({ cards, hidden = true }) => (
  <View style={styles.container}>
    {cards.map((cardData, index) => (
      <Card key={index} card={cardData} hidden={hidden} />
    ))}
  </View>
);

export default CardHand;
