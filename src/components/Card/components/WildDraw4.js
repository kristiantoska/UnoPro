import React from 'react';
import { G } from 'react-native-svg';

import { CardShape } from './';

const WildDraw4 = params => {
  const { cardHeight, cardWidth, shadow } = params;

  const shiftX = cardWidth / 8;
  const shiftY = cardHeight / 8;

  return (
    <React.Fragment>
      <G x={-(shiftX * 3) / 2} y={shiftY}>
        <CardShape {...{ ...params, color: shadow ? 'black' : 'yellow' }} />
      </G>

      <G x={-shiftX / 2} y={-shiftY / 2}>
        <CardShape {...{ ...params, color: shadow ? 'black' : 'red' }} />
      </G>

      <G x={shiftX / 2} y={shiftY / 2}>
        <CardShape {...{ ...params, color: shadow ? 'black' : 'blue' }} />
      </G>

      <G x={(shiftX * 3) / 2} y={-shiftY}>
        <CardShape {...{ ...params, color: shadow ? 'black' : 'green' }} />
      </G>
    </React.Fragment>
  );
};

export default WildDraw4;
