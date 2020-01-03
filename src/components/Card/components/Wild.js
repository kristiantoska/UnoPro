import React from 'react';
import { G, Path } from 'react-native-svg';

import { COLORS } from '../../../constants';

const Wild = params => {
  const { cardHeight, cardWidth } = params;

  const rx = cardWidth * 0.43;
  const ry = cardHeight * 0.43;

  const Quarter = ({ color, flipped }) => (
    <Path
      d={`M ${cardWidth / 2},${cardHeight / 2} l ${
        flipped ? rx : -rx
      },0  a ${rx},${ry} 0 0 ${flipped ? 1 : 0} ${flipped ? -rx : rx},${ry} z`}
      fill={color}
      stroke={COLORS.white}
      strokeWidth={1}
    />
  );

  return (
    <React.Fragment>
      <G originX={cardWidth / 2} originY={cardHeight / 2} rotation={25}>
        <Quarter color={COLORS.yellow} />
      </G>

      <G originX={cardWidth / 2} originY={cardHeight / 2} rotation={205}>
        <Quarter color={COLORS.green} />
      </G>

      <G originX={cardWidth / 2} originY={cardHeight / 2} rotation={25}>
        <Quarter color={COLORS.blue} flipped />
      </G>

      <G originX={cardWidth / 2} originY={cardHeight / 2} rotation={205}>
        <Quarter color={COLORS.red} flipped />
      </G>
    </React.Fragment>
  );
};

export default Wild;
