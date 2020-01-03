import React from 'react';
import { G } from 'react-native-svg';

import { CardShape } from './';

const Draw2 = params => {
  const { cardHeight, cardWidth } = params;

  const shiftX = cardWidth / 8;
  const shiftY = cardHeight / 8;

  return (
    <React.Fragment>
      <G x={-shiftX / 2} y={shiftY / 2}>
        <CardShape {...params} />
      </G>

      <G x={shiftX / 2} y={-shiftY / 2}>
        <CardShape {...params} />
      </G>
    </React.Fragment>
  );
};
export default Draw2;
