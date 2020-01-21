import React from 'react';
import { Rect } from 'react-native-svg';

import { COLORS } from '../../../constants';

const CardShape = ({ cardHeight, cardWidth, value, color, fontSize }) => {
  const height = cardHeight / 4;
  const width = cardWidth / 4;

  return (
    <Rect
      originX={cardWidth / 2}
      originY={cardHeight / 2}
      x={cardWidth / 2 - width / 2}
      y={cardHeight / 2 - height / 2}
      width={width}
      height={height}
      fill={COLORS[color]}
      stroke={COLORS.black}
      strokeWidth={0.5}
      rx={1}
      ry={1}
      rotation={4}
    />
  );
};
export default CardShape;
