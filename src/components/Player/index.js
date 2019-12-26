import React from 'react';
import { View, Dimensions } from 'react-native';
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
  active,
}) => {
  const arcHeight = height - 15;

  return (
    <View
      style={[
        styles.playerContainer,
        positionConfig(height, width)[position],
        { height, width },
      ]}
    >
      <Svg height={arcHeight} width={width} style={styles.backgroundSvg}>
        <Path
          d={`M 0, ${arcHeight} Q ${width /
            2}, ${-arcHeight} ${width}, ${arcHeight}`}
          fill="#0073A9"
          stroke="none"
        />
      </Svg>

      <View style={styles.cardHandContainer}>
        <CardHand cards={cards} hidden={!active} />
      </View>

      <View style={styles.playerIcon} />
    </View>
  );
};

export default Player;
