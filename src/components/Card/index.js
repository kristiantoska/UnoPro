import React from 'react';
import { View } from 'react-native';
import Svg, { Path, Rect, Ellipse, Text as SvgText, G } from 'react-native-svg';

import { CARD_RATIO } from '../../constants';
import styles from './styles';

const COLORS = {
  white: '#ffffff',
  red: '#EC1A23',
  yellow: '#FEDE01',
  green: '#00A54F',
  blue: '#0194D9',
  black: '#000000',
};

const renderText = ({ cardHeight, cardWidth, value, color, fontSize }) => {
  return (
    <React.Fragment>
      <SvgText
        dx={1}
        dy={1}
        originX={cardWidth / 2}
        originY={cardHeight / 2}
        fill="black"
        fontSize={fontSize}
        fontWeight="bold"
        x={cardWidth / 2}
        y={cardHeight / 2 + fontSize / 3}
        textAnchor="middle"
        rotation={4}
      >
        {value}
      </SvgText>

      <SvgText
        originX={cardWidth / 2}
        originY={cardHeight / 2}
        fill={COLORS[color]}
        fontSize={fontSize}
        fontWeight="bold"
        x={cardWidth / 2}
        y={cardHeight / 2 + fontSize / 3}
        textAnchor="middle"
        rotation={4}
      >
        {value}
      </SvgText>

      {(value === 6 || value === 9) && (
        <Rect
          x={cardWidth / 2 - 7}
          y={cardHeight / 2 + fontSize / 2}
          height={2}
          width={14}
          fill={COLORS[color]}
          stroke="black"
          strokeWidth={0.5}
        />
      )}
    </React.Fragment>
  );
};

const Card = ({ card = { value: 6, color: 'blue' }, hidden }) => {
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

  return (
    <View
      style={[
        styles.container,
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
          renderText({
            ...config,
            value: 'UNO',
            color: 'yellow',
            fontSize: 13,
          })
        ) : (
          <React.Fragment>
            <G
              originX={cardWidth / 2}
              originY={cardHeight / 2}
              scale={0.3}
              x={-cardWidth / 2 + 5}
              y={-cardHeight / 2 + 7}
            >
              {renderText({ ...config, color: 'white' })}
            </G>

            {renderText(config)}

            <G
              originX={cardWidth / 2}
              originY={cardHeight / 2}
              scale={0.3}
              x={cardWidth / 2 - 5}
              y={cardHeight / 2 - 7}
              rotation={180}
            >
              {renderText({ ...config, color: 'white' })}
            </G>
          </React.Fragment>
        )}
      </Svg>
    </View>
  );
};

export default Card;
