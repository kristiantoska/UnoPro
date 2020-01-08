import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Card } from '../';
import styles from './styles';

const MAX_PILE_HEIGHT = 14;
const D_X = 18;
const D_Y = 18;
const D_ANGLE = 90;

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const CardPile = () => {
  const [pileCards, setPileCards] = useState([]);

  function addCardToPile() {
    setPileCards([
      ...pileCards.slice(
        Math.max(0, pileCards.length - 1 - MAX_PILE_HEIGHT),
        pileCards.length,
      ),
      {
        cardData: {
          value: 'reverse',
          color: 'red',
        },
        positionData: {
          translateX: randomIntFromInterval(0, 2 * D_X) - D_X,
          translateY: randomIntFromInterval(0, 2 * D_Y) - D_Y,
          rotate: randomIntFromInterval(0, 2 * D_ANGLE) - D_ANGLE,
        },
      },
    ]);
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={() => addCardToPile()}
    >
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
    </TouchableOpacity>
  );
};

export default CardPile;
