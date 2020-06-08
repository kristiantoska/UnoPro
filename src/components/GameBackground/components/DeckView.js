import React from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';

import { Card } from '../../';
import styles from '../styles';

const Deck = React.memo(() => (
  <React.Fragment>
    {new Array(20).fill(0).map((el, i) => (
      <View
        key={i}
        style={[
          styles.absoluteView,
          {
            transform: [
              { rotateZ: Platform.OS === 'ios' ? '135deg' : '-45deg' },
              { rotateY: '45deg' },
              { rotateX: '45deg' },
              { translateX: i * 0.8 },
              { translateY: -i * 0.6 },
            ],
          },
        ]}
      >
        <Card card={{}} hidden />
      </View>
    ))}
  </React.Fragment>
));

const DeckView = ({ canDrawCard, drawCard }) => (
  <TouchableOpacity
    style={[
      styles.absoluteView,
      // eslint-disable-next-line react-native/no-inline-styles
      {
        height: 50,
        width: 76,
        left: 160,
        bottom: 120,
        opacity: !canDrawCard ? 0.5 : 1,
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
      },
    ]}
    disabled={!canDrawCard}
    onPress={drawCard}
  >
    <Deck />
  </TouchableOpacity>
);

export default DeckView;
