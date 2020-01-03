import React, { useRef } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COLORS } from '../../constants';
import RotationProvider from './RotationProvider';
import ArcsCircle from './ArcsCircle';
import styles from './styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const GameBackground = ({ animationEnabled = false }) => {
  const animation = useRef(new Animated.Value(1));

  const cx = 150;
  const cy = 150;

  const r1 = 40;
  const r2 = 50;
  const r3 = 60;

  const color = 'blue';
  const T = 8000;

  const scaleBump = () => {
    if (animationEnabled) {
      Animated.timing(animation.current, {
        duration: 400,
        toValue: 1.3,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(animation.current, {
          duration: 400,
          toValue: 1,
          useNativeDriver: true,
        }).start(),
      );
    }
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.9}
      style={[styles.container, { transform: [{ scale: animation.current }] }]}
      onPress={() => scaleBump()}
    >
      <RotationProvider
        style={styles.absoluetView}
        duration={T}
        {...{ animationEnabled }}
      >
        <Svg height={300} width={300}>
          <ArcsCircle r={r1} {...{ cx, cy, color }} />
        </Svg>
      </RotationProvider>

      <RotationProvider
        style={styles.absoluetView}
        duration={T * 1.4}
        flipped
        {...{ animationEnabled }}
      >
        <Svg height={300} width={300}>
          <Circle x={cx} y={cy} r={r2} fill="none" stroke={COLORS[color]} />

          <ArcsCircle r={r3} shiftAngle={45} {...{ cx, cy, color }} flipped />
        </Svg>
      </RotationProvider>
    </AnimatedTouchableOpacity>
  );
};

export default GameBackground;
