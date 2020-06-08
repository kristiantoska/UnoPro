import React, { useRef, useCallback } from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { COLORS } from '../../constants';
import { ArcsCircle, RotationProvider, DeckView } from './components';

import styles from './styles';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableOpacity,
);

const GameBackground = React.memo(
  ({
    animationEnabled = false,
    boardColor,
    turnsReversed,
    drawCard,
    canDrawCard,
  }) => {
    const animation = useRef(new Animated.Value(1));

    const cx = 150;
    const cy = 150;

    const r1 = 50;
    const r2 = 60;
    const r3 = 70;

    const T = 8000;
    const bumpAnimT = 300;

    const scaleBump = useCallback(() => {
      if (animationEnabled) {
        Animated.spring(animation.current, {
          toValue: 1.1,
          speed: 40,
          useNativeDriver: true,
        }).start(() =>
          Animated.timing(animation.current, {
            duration: bumpAnimT,
            toValue: 1,
            useNativeDriver: true,
          }).start(),
        );
      }
    }, [animationEnabled]);

    return (
      <React.Fragment>
        <AnimatedTouchableOpacity
          activeOpacity={1}
          style={[
            styles.container,
            {
              transform: [
                { scale: animation.current },
                { rotateX: turnsReversed ? '180deg' : '0deg' },
              ],
            },
          ]}
          onPress={() => scaleBump()}
        >
          <RotationProvider
            style={styles.absoluteView}
            duration={T * 2.5}
            flipped={false}
            {...{ animationEnabled }}
          >
            <Svg height={300} width={300}>
              <Circle
                x={cx}
                y={cy}
                r={r2}
                fill="none"
                stroke={COLORS[boardColor]}
              />

              <ArcsCircle
                r={r3}
                shiftAngle={45}
                {...{ cx, cy, color: boardColor }}
                flipped={false}
              />
            </Svg>
          </RotationProvider>
        </AnimatedTouchableOpacity>

        <DeckView {...{ drawCard, canDrawCard }} />
      </React.Fragment>
    );
  },
);

export default GameBackground;
