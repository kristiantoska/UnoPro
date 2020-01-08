import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Ellipse, G } from 'react-native-svg';

import { CARD_RATIO, COLORS } from '../../constants';
import Symbols from './Symbols';
import styles from './styles';

const Card = React.memo(
  ({
    card = { value: 'wildDraw4', color: 'blue' },
    hidden,
    isValid,
    inCardHand,
  }) => {
    const { value, color } = card;
    const cardHeight = 60;
    const cardWidth = Math.round(cardHeight / CARD_RATIO);
    const strokeWidth = 1;

    const config = {
      ...card,
      cardHeight,
      cardWidth,
      fontSize: 24,
    };

    const invalidCard = !isValid && !hidden;
    const sideValues =
      value === 'wildDraw4' ? '+4' : value === 'draw2' ? '+2' : value;
    const sideScale = value === 'wild' ? 0.2 : 0.3;

    return (
      <View
        style={[
          styles.container,
          inCardHand && styles.cardContainer,
          inCardHand && invalidCard && styles.invalidCard,
          {
            height: cardHeight,
            width: cardWidth,
          },
        ]}
      >
        <Svg height={cardHeight} width={cardWidth}>
          <Rect
            x={strokeWidth / 2}
            y={strokeWidth / 2}
            rx={5}
            ry={5}
            height={cardHeight - strokeWidth}
            width={cardWidth - strokeWidth}
            strokeWidth={strokeWidth}
            fill={hidden ? COLORS.black : COLORS[color]}
            stroke="white"
          />

          <Ellipse
            originX={cardWidth / 2}
            originY={cardHeight / 2}
            cx={cardWidth / 2}
            cy={cardHeight / 2}
            rx={cardWidth * 0.43}
            ry={cardHeight * 0.43}
            fill={hidden ? COLORS.red : 'white'}
            rotation={25}
          />

          {hidden ? (
            <Symbols
              {...{
                ...config,
                value: 'UNO',
                color: 'yellow',
                fontSize: 13,
              }}
            />
          ) : (
            <React.Fragment>
              <G
                originX={cardWidth / 2}
                originY={cardHeight / 2}
                scale={sideScale}
                x={-cardWidth / 2 + 5}
                y={-cardHeight / 2 + 7}
              >
                <Symbols
                  {...{
                    ...config,
                    color: 'white',
                    value: sideValues,
                  }}
                />
              </G>

              <Symbols {...config} />

              <G
                originX={cardWidth / 2}
                originY={cardHeight / 2}
                scale={sideScale}
                x={cardWidth / 2 - 5}
                y={cardHeight / 2 - 7}
                rotation={180}
              >
                <Symbols
                  {...{
                    ...config,
                    color: 'white',
                    value: sideValues,
                  }}
                />
              </G>
            </React.Fragment>
          )}
        </Svg>

        {invalidCard && (
          <View
            style={[
              styles.invalidCardOverlay,
              { width: cardWidth + 1, height: cardHeight + 1 },
            ]}
          />
        )}
      </View>
    );
  },
);

export default Card;
