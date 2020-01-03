import React from 'react';
import { Circle, Rect } from 'react-native-svg';

import { COLORS } from '../../../constants';

const Skip = ({ cardHeight, cardWidth, value, color, fontSize }) => {
  const r = cardWidth / 4;
  const strokeWidth = 4;

  return (
    <React.Fragment>
      <Circle
        r={r}
        cx={cardWidth / 2}
        cy={cardHeight / 2}
        fill="none"
        stroke={COLORS[color]}
        strokeWidth={strokeWidth}
      />

      <Rect
        originX={cardWidth / 2}
        originY={cardHeight / 2}
        x={cardWidth / 2 - r}
        y={cardHeight / 2 - strokeWidth / 2}
        height={strokeWidth}
        width={cardWidth / 2}
        fill={COLORS[color]}
        rotation={-53}
      />
    </React.Fragment>
  );
};

export default Skip;
