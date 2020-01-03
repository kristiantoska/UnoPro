import React from 'react';
import { Path, G } from 'react-native-svg';

import { COLORS } from '../../../constants';

const Reverse = ({ cardHeight, cardWidth, value, color, fontSize }) => {
  const centerX = cardWidth / 2;
  const centerY = cardHeight / 2;
  const d = 5;
  const arrowDistance = 0.4;

  const ArrowHand = () => (
    <Path
      d={`M ${centerX},${centerY} l ${-d},0 q 0,${-d} ${d},${-d} l ${2 *
        d},0 l 0,${-d / 2} l ${d},${d} l ${-d},${d} l 0,${-d / 2} z`}
      fill={COLORS[color]}
    />
  );

  return (
    <React.Fragment>
      <G
        x={-arrowDistance}
        y={-arrowDistance}
        originX={centerX}
        originY={centerY}
        rotation={-45}
      >
        <ArrowHand />
      </G>

      <G
        x={arrowDistance}
        y={arrowDistance}
        originX={centerX}
        originY={centerY}
        rotation={135}
      >
        <ArrowHand />
      </G>
    </React.Fragment>
  );
};

export default Reverse;
