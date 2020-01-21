import React from 'react';
import { Rect, G } from 'react-native-svg';

import { COLORS } from '../../constants';
import * as SymbolComps from './components';

const Symbols = ({ shadowsEnabled, ...params }) => {
  const { cardHeight, cardWidth, value, color, fontSize } = params;

  const Comp =
    !isNaN(value) || value === 'UNO'
      ? SymbolComps.Text
      : SymbolComps[value.charAt(0).toUpperCase() + value.slice(1)];

  return (
    <React.Fragment>
      {value !== 'wild' && shadowsEnabled && (
        <G x={1} y={1}>
          <Comp {...{ ...params, color: 'black', shadow: true }} />
        </G>
      )}

      <Comp {...params} />

      {(value === 6 || value === 9) && (
        <Rect
          x={cardWidth / 2 - 7}
          y={cardHeight / 2 + fontSize / 2}
          height={2}
          width={14}
          fill={COLORS[color]}
          {...(shadowsEnabled
            ? {
                stroke: 'black',
                strokeWidth: 0.5,
              }
            : {})}
        />
      )}
    </React.Fragment>
  );
};

export default Symbols;
