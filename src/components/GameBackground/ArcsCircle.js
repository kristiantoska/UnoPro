import React from 'react';
import { Path, Circle, G } from 'react-native-svg';

import { COLORS } from '../../constants';

const degToRad = deg => (deg * Math.PI) / 180;

const Arc = ({ cx, cy, r, color, rotation, angle = 60, flipped }) => {
  const endX = cx + Math.cos(degToRad(angle)) * r;
  const endY = flipped
    ? cy - Math.sin(degToRad(angle)) * r
    : cy + Math.sin(degToRad(angle)) * r;
  const arcSide = flipped ? '0 0' : '0 1';

  const ArcLine = ({ ...params }) => (
    <Path
      d={`M ${cx + r} ${cy} A ${r} ${r} 0 ${arcSide} ${endX} ${endY}`}
      stroke={COLORS[color]}
      strokeWidth={0.5}
      fill="none"
      {...params}
    />
  );

  return (
    <G originX={cx} originY={cy} rotation={rotation}>
      <ArcLine originX={cx + r} originY={cy} rotation={-1} />
      <ArcLine />
      <ArcLine originX={cx + r} originY={cy} rotation={1} />
      <Circle x={endX} y={endY} r={2.4} fill={COLORS[color]} />
    </G>
  );
};

const ArcsCircle = ({ shiftAngle = 0, ...arcParams }) => (
  <React.Fragment>
    <Arc rotation={shiftAngle} {...arcParams} />
    <Arc rotation={shiftAngle + 90} {...arcParams} />
    <Arc rotation={shiftAngle + 180} {...arcParams} />
    <Arc rotation={shiftAngle + 270} {...arcParams} />
  </React.Fragment>
);

export default ArcsCircle;
