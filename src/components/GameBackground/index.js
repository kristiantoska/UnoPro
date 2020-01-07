import React, { useRef } from 'react';
import { View, Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COLORS } from '../../constants';
import { Card } from '../';
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
  const bumpT = 300;

  const scaleBump = () => {
    if (animationEnabled) {
      Animated.spring(animation.current, {
        toValue: 1.2,
        speed: 50,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(animation.current, {
          duration: bumpT,
          toValue: 1,
          useNativeDriver: true,
        }).start(),
      );
    }
  };

  const DeckView = () => (
    <View style={[styles.absoluteView, { left: 220, bottom: 160 }]}>
      {new Array(20).fill(0).map((el, i) => (
        <View
          key={i}
          style={[
            styles.absoluteView,
            {
              transform: [
                { rotateZ: '135deg' },
                { rotateY: '45deg' },
                { rotateX: '45deg' },
                { translateX: i * 0.8 },
                { translateY: -i * 0.6 },
              ],
            },
          ]}
        >
          <Card hidden />
        </View>
      ))}
    </View>
  );

  return (
    <React.Fragment>
      <AnimatedTouchableOpacity
        activeOpacity={1}
        style={[
          styles.container,
          { transform: [{ scale: animation.current }] },
        ]}
        onPress={() => scaleBump()}
      >
        <RotationProvider
          style={styles.absoluteView}
          duration={T}
          {...{ animationEnabled }}
        >
          <Svg height={300} width={300}>
            <ArcsCircle r={r1} {...{ cx, cy, color }} />
          </Svg>
        </RotationProvider>

        <RotationProvider
          style={styles.absoluteView}
          duration={T * 2.5}
          {...{ animationEnabled }}
        >
          <Svg height={300} width={300}>
            <Circle x={cx} y={cy} r={r2} fill="none" stroke={COLORS[color]} />

            <ArcsCircle r={r3} shiftAngle={45} {...{ cx, cy, color }} />
          </Svg>
        </RotationProvider>
      </AnimatedTouchableOpacity>

      <DeckView />
    </React.Fragment>
  );
};

export default GameBackground;
