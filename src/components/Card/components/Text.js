import React from 'react';
import { Text as SvgText } from 'react-native-svg';

import { COLORS } from '../../../constants';

const Text = ({ cardHeight, cardWidth, value, color, fontSize }) => (
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
);

export default Text;
