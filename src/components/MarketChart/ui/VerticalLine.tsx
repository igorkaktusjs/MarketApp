import React from 'react';
import { Line as SkiaLine } from "@shopify/react-native-skia";
import type { SharedValue } from "react-native-reanimated";

const VerticalLine = ({
  x,
  chartBounds
}: {
  x: SharedValue<number>;
  chartBounds: { top: number; bottom: number };
}) => (
  <SkiaLine
    p1={{ x: x.value, y: chartBounds.top }}
    p2={{ x: x.value, y: chartBounds.bottom }}
    strokeWidth={14}
    color="rgba(0, 0, 0, 0.3)"
  />
);

export default VerticalLine;
