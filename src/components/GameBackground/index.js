import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COLORS } from '../../constants';
import RotationProvider from './RotationProvider';
import ArcsCircle from './ArcsCircle';
import styles from './styles';

const GameBackground = () => {
  const cx = 150;
  const cy = 150;

  const r1 = 40;
  const r2 = 50;
  const r3 = 60;

  const color = 'blue';
  const T = 8000;

  return (
    <View style={styles.container}>
      <RotationProvider style={styles.absoluetView} duration={T}>
        <Svg height={300} width={300}>
          <ArcsCircle r={r1} {...{ cx, cy, color }} />
        </Svg>
      </RotationProvider>

      <RotationProvider style={styles.absoluetView} duration={T * 1.4} flipped>
        <Svg height={300} width={300}>
          <Circle x={cx} y={cy} r={r2} fill="none" stroke={COLORS[color]} />

          <ArcsCircle r={r3} shiftAngle={45} {...{ cx, cy, color }} flipped />
        </Svg>
      </RotationProvider>
    </View>
  );
};

export default GameBackground;
