import React from 'react';
import { G } from 'react-native-svg';

import { CardShape } from './';

const WildDraw4 = params => {
  const { cardHeight, cardWidth } = params;

  const shiftX = cardWidth / 8;
  const shiftY = cardHeight / 8;

  return (
    <React.Fragment>
      <G x={-(shiftX * 3) / 2} y={shiftY}>
        <CardShape {...{ ...params, color: 'yellow' }} />
      </G>

      <G x={-shiftX / 2} y={-shiftY / 2}>
        <CardShape {...{ ...params, color: 'red' }} />
      </G>

      <G x={shiftX / 2} y={shiftY / 2}>
        <CardShape {...{ ...params, color: 'blue' }} />
      </G>

      <G x={(shiftX * 3) / 2} y={-shiftY}>
        <CardShape {...{ ...params, color: 'green' }} />
      </G>
    </React.Fragment>
  );
};

export default WildDraw4;
