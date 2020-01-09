import React from 'react';
import { View } from 'react-native';

import { Card } from '../';
import styles from './styles';

const CardHand = ({
  cards,
  hidden = true,
  activeCardFilter,
  hasTurn,
  onCardClick,
}) => (
  <View style={styles.container}>
    {cards.map((cardData, index) => (
      <Card
        key={index}
        card={cardData}
        hidden={hidden}
        isValid={hasTurn ? activeCardFilter(cardData) : false}
        inCardHand
        onCardClick={onCardClick}
      />
    ))}
  </View>
);

export default CardHand;
