import React from 'react';
import { View } from 'react-native';

import { Card } from '../';
import styles from './styles';

const CardPile = ({ pileCards, addCardToPile }) => {
  return (
    <View style={styles.container}>
      {pileCards.map((pileCard, i) => (
        <View
          style={[
            styles.pileCardContainer,
            {
              transform: [
                { translateX: pileCard.positionData.translateX },
                { translateY: pileCard.positionData.translateY },
                { rotate: `${pileCard.positionData.rotate}deg` },
              ],
            },
          ]}
          key={JSON.stringify(pileCard.cardData)}
        >
          <Card card={pileCard.cardData} />

          <View
            style={[
              styles.invalidCardOverlay,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                opacity: i !== pileCards.length - 1 ? 1 : 0,
              },
            ]}
          />
        </View>
      ))}
    </View>
  );
};

export default CardPile;
