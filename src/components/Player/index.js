import React from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import styles from './styles';
import positionConfig from './positionConfig';

const { height: screenHeight } = Dimensions.get('window');

const Player = ({
  height = 50,
  width = screenHeight * 0.8,
  position = 'bottom',
}) => (
  <View
    style={[
      styles.playerContainer,
      positionConfig(height, width)[position],
      { height, width },
    ]}
  >
    <Svg height={height} width={width} style={styles.backgroundSvg}>
      <Path
        d={`M 0, ${height} Q ${width / 2}, ${-height} ${width}, ${height}`}
        fill="#0073A9"
        stroke="none"
      />
    </Svg>

    <View style={styles.playerIcon} />
  </View>
);

export default Player;
