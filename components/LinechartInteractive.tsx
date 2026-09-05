import { mapLineChartData } from "@/services/LineChartDataService";
import { Assets } from "@/types/Asset";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LineChart, TLineChartDataProp } from "react-native-wagmi-charts";

type Props = {
  data: Assets | null;
  onCurrentValueChange?: (value: number) => void;
};

export default function LinechartInteractive(props: Props) {
  const [data, setData] = useState<TLineChartDataProp>([]);
  const [lineColor, setLineColor] = useState("#1ED39A");

  const dataRef = useRef<TLineChartDataProp>([]);
  const totalPortfolioRef = useRef<number>(0);
  const breakEvenValue = props.data?.assets.reduce(
    (sum, asset) => sum + asset.quantity * asset.boughtAt,
    0,
  );

  useEffect(() => {
    if (props.data != null) {
      const mappedData = mapLineChartData(props.data);
      dataRef.current = mappedData;
      setData(mappedData);

      if (totalPortfolioRef.current === 0) {
        totalPortfolioRef.current = breakEvenValue ?? 0;
      }
    }
  }, [props.data, breakEvenValue]);

  useEffect(() => {
    if (!props.data) return;

    const flatData = Array.isArray(dataRef.current)
      ? dataRef.current
      : (Object.values(dataRef.current ?? {})[0] ?? []);

    const lastValue = flatData[flatData.length - 1]?.value ?? 0;
    setLineColor(
      lastValue < (totalPortfolioRef.current ?? 0) ? "#FF5C5C" : "#1ED39A",
    );
  }, [dataRef.current, totalPortfolioRef.current]);

  const handleCurrentIndexChange = (index: number) => {
    const flatData = Array.isArray(dataRef.current)
      ? dataRef.current
      : (Object.values(dataRef.current ?? {})[0] ?? []);

    if (!flatData.length) return;

    const currentValue =
      flatData[index]?.value ?? flatData[flatData.length - 1]?.value ?? 0;

    if (props.onCurrentValueChange) {
      props.onCurrentValueChange(currentValue);
    }

    setLineColor(
      currentValue < (totalPortfolioRef.current ?? 0) ? "#FF5C5C" : "#1ED39A",
    );
  };

  if (!data.length) {
    return null;
  }

  const flatData = Array.isArray(data)
    ? data
    : (Object.values(data ?? {})[0] ?? []);
  const chartValues = flatData.map((point) => point.value);
  const minValue = Math.min(...chartValues);
  const maxValue = Math.max(...chartValues);
  const minTimestamp = new Date(flatData[0].timestamp).getTime();
  const maxTimestamp = new Date(
    flatData[flatData.length - 1].timestamp,
  ).getTime();

  return (
    <GestureHandlerRootView style={styles.root}>
      <LineChart.Provider
        data={data}
        onCurrentIndexChange={handleCurrentIndexChange}
      >
        <LineChart width={Dimensions.get("window").width - 24} height={220}>
          <LineChart.Path color={lineColor}>
            <LineChart.HorizontalLine
              at={{ value: breakEvenValue ?? 0 }}
              color="#A0AEC0"
              lineProps={{ strokeDasharray: "4 6" }}
            />
          </LineChart.Path>
          <LineChart.Axis
            position="left"
            orientation="vertical"
            domain={[minValue, maxValue]}
            tickCount={4}
            color="#7C8AA5"
            format={(value) => `${Number(value).toFixed(0)}€`}
          />
          <LineChart.Axis
            position="bottom"
            orientation="horizontal"
            domain={[minTimestamp, maxTimestamp]}
            tickCount={Math.min(4, Math.max(2, flatData.length - 1))}
            color="#7C8AA5"
            textStyle={{ fontSize: 9 }}
            format={(value) =>
              new Date(Number(value)).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
              })
            }
          />
          <LineChart.CursorCrosshair color={lineColor} />
        </LineChart>
      </LineChart.Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
