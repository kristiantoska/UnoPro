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
          key={JSON.stringify(pileCard.positionData)}
        >
          <Card card={pileCard.cardData} isValid={i === pileCards.length - 1} />
        </View>
      ))}
    </View>
  );
};

export default CardPile;
