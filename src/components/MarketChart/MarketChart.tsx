import React from "react";
import { View, Text, ActivityIndicator, Button, Pressable } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { useFont,Canvas, DashPathEffect} from "@shopify/react-native-skia";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import inter from "../../../assets/Inter.ttf";
import { useGetAAPLHistoryQuery } from "../../store/marketApi";
import { formatTimestampToDate } from "./utils/formatters";
import { LINE_COLORS, LineKey } from "./constants";
import VerticalLine from "./ui/VerticalLine";
import LegendDot from "./ui/LegendDot";
import { styles } from "./styles";
import { toggleZoom } from "../../store/displaySlice"; 

const MarketChart: React.FC = () => {
  const { data, isLoading, isError, refetch, error } = useGetAAPLHistoryQuery();
  const font = useFont(inter, 12);
  const dispatch = useDispatch();
  const { display, display: { zoomed } } = useSelector((state: RootState) => ({
    display: state.display,
    zoomed: state.display.zoomed // Get zoomed state from Redux
  }));

  const handleToggleZoom = () => dispatch(toggleZoom()); // Dispatch toggleZoom action

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { open: 0,high: 0,low: 0, close: 0 }
  });

  if (!font) {
    return (
      <View style={styles.center}>
        <Text>Font loading error.</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text>Error loading data</Text>
        <Text>{error ? JSON.stringify(error) : "Unknown error"}</Text>
        <Button title="Retry" onPress={refetch} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.legendRow}>
        {Object.entries(display).map(([key, isShown]) =>
          // Exclude 'zoomed' from the legend
          key !== 'zoomed' && isShown ? (
            <LegendDot key={key} label={key} color={LINE_COLORS[key as LineKey]} />
          ) : null
        )}
      </View>

      <View style={{ height: 300, width: '100%', marginBottom: 20, paddingHorizontal: 10 }}>
        {/* Toggle Zoom on Press */}
        <Pressable onPress={handleToggleZoom} style={{ flex: 1 }}>
          <CartesianChart
            data={data}
            xKey="timestamp"
            yKeys={Object.keys(display).filter(key => key !== 'zoomed') as LineKey[]} // Filter out 'zoomed'
            padding={5}
            
            axisOptions={{
              font,
              tickCount: { x: 4, y: 4 },
              tickFormatX: (val) => ` ${formatTimestampToDate(Number(val))} `,
              tickFormatY: (val) => `${val.toFixed(8)}`,
            }}
            
            
            chartPressState={state}
          >
            {({ points, chartBounds }) => (
              <>
                {Object.entries(display).map(([key, show]) => {
                  if (!show || key === 'zoomed') return null; // Filter out 'zoomed'
                  const pointData = points[key as LineKey];

                  const offset =
                    key === 'close' ? -30 :
                    key === 'low' ? +15 :
                    key === 'high' ? -15 : 0;

                  const zoomFactor = zoomed ? 1.5 : 1;

                  return (
                    <Line
                      key={key}
                      points={pointData?.map(p => ({ ...p, y: p.y * zoomFactor + offset })) || []}
                      color={LINE_COLORS[key as LineKey]}
                      strokeWidth={1}
                    />
                  );
                })}
                {isActive && (
                  <VerticalLine x={state.x.position} chartBounds={chartBounds} />
                )}
              </>
            )}
          </CartesianChart>
        </Pressable>
      </View>
    </View>
  );
};

export default MarketChart;