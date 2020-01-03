import React, { useRef, useEffect, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

const RotationProvider = ({ style, duration = 5000, flipped, children }) => {
  const animation = useRef(new Animated.Value(0));

  const startAnimation = useCallback(
    toValue => {
      Animated.timing(animation.current, {
        duration,
        toValue,
        easing: Easing.linear,
      }).start(() => {
        animation.current.setValue(0);
        startAnimation(1);
      });
    },
    [duration],
  );

  useEffect(() => {
    // startAnimation(1);
  }, [startAnimation]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            {
              rotate: animation.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', flipped ? '-360deg' : '360deg'],
                extrapolate: false,
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default RotationProvider;
