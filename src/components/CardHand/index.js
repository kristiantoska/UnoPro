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
    {cards.map((cardData, i) => {
      const isValid = hasTurn ? activeCardFilter(cardData) : false;
      const invalidCard = !isValid && !hidden;

      return (
        <View
          key={`${cardData.value}-${cardData.color}-${cardData.key}`}
          style={
            // eslint-disable-next-line react-native/no-inline-styles
            {
              marginLeft: i !== 0 ? -cards.length : 0,
              bottom: invalidCard ? -7 : 0,
            }
          }
          pointerEvents={invalidCard ? 'none' : 'auto'}
        >
          <Card
            card={cardData}
            hidden={hidden}
            inCardHand
            onCardClick={onCardClick}
          />

          <View
            style={[
              styles.invalidCardOverlay,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                opacity: invalidCard ? 1 : 0,
              },
            ]}
            pointerEvents={invalidCard ? 'auto' : 'none'}
          />
        </View>
      );
    })}
  </View>
);

export default CardHand;
