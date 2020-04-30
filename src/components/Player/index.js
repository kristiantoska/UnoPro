import React from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { CardHand } from '../';
import styles from './styles';
import positionConfig from './positionConfig';

const { height: screenHeight } = Dimensions.get('window');

const Player = ({
  height = 60,
  width = screenHeight * 0.8,
  position = 'bottom',
  cards = [],
  activeCardFilter,
  onCardClick,
  active,
  hasTurn,
  unoSaidThisTurn,
  sayUno,
  gameActive,
}) => {
  const arcHeight = height + 5;
  const canSayUno = gameActive && hasTurn && cards.length === 2;

  return (
    <View
      style={[
        styles.playerContainer,
        positionConfig(height, width)[position],
        { height, width },
      ]}
    >
      <Svg
        height={arcHeight}
        width={width}
        style={[
          styles.backgroundSvg,
          { opacity: hasTurn ? 1 : 0.3, bottom: hasTurn ? 0 : -20 },
        ]}
      >
        <Path
          d={`M 0, ${arcHeight} Q ${width /
            2}, ${-arcHeight} ${width}, ${arcHeight}`}
          fill="#0080ff"
          stroke="none"
        />
      </Svg>

      <View style={styles.cardHandContainer}>
        <CardHand
          cards={cards}
          hidden={!active}
          hasTurn={hasTurn && gameActive}
          activeCardFilter={activeCardFilter}
          onCardClick={onCardClick}
        />
      </View>

      <View style={styles.playerIcon} />

      {sayUno && (
        <TouchableOpacity
          style={[
            styles.unoButton,
            !canSayUno && styles.unoButtonDisabled,
            unoSaidThisTurn && styles.unoButtonPressed,
          ]}
          onPress={sayUno}
          disabled={unoSaidThisTurn || !canSayUno}
        >
          <Text style={styles.unoButtonText}>UNO</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Player;
