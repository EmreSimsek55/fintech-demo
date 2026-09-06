import { formatCurrency } from "@/services/AssetService";
import { mapLineChartData } from "@/services/LineChartDataService";
import { Asset } from "@/types/Asset";
import { getLocales } from "expo-localization";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { LineChart, TLineChartDataProp } from "react-native-wagmi-charts";

type Props = {
  data: Asset[] | null;
  onCurrentValueChange?: (value: number) => void;
};

export default function LinechartInteractive(props: Props) {
  const [data, setData] = useState<TLineChartDataProp>([]);
  const [lineColor, setLineColor] = useState("#1ED39A");

  const locale = getLocales()[0].languageTag;

  const [totalPortfolio, setTotalPortfolio] = useState<number>(0);
  const breakEvenValue = props.data?.reduce(
    (sum, asset) => sum + asset.quantity * asset.boughtAt,
    0,
  );

  useEffect(() => {
    if (props.data != null) {
      const mappedData = mapLineChartData(props.data);
      setData(mappedData);

      setTotalPortfolio(breakEvenValue ?? 0);
    }
  }, [props.data, breakEvenValue]);

  useEffect(() => {
    if (!props.data) return;

    const flatData = Array.isArray(data)
      ? data
      : (Object.values(data ?? {})[0] ?? []);

    const lastValue = flatData[flatData.length - 1]?.value ?? 0;
    setLineColor(lastValue < (totalPortfolio ?? 0) ? "#FF5C5C" : "#1ED39A");
  }, [data, totalPortfolio]);

  const handleCurrentIndexChange = useCallback(
    (index: number) => {
      const flatData = Array.isArray(data)
        ? data
        : (Object.values(data ?? {})[0] ?? []);

      if (!flatData.length) return;

      const currentValue =
        flatData[index]?.value ?? flatData[flatData.length - 1]?.value ?? 0;

      if (props.onCurrentValueChange) {
        props.onCurrentValueChange(currentValue);
      }

      setLineColor(
        currentValue < (totalPortfolio ?? 0) ? "#FF5C5C" : "#1ED39A",
      );
    },
    [data, props.onCurrentValueChange, totalPortfolio],
  );

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
            format={(value) =>
              formatCurrency(
                Number(value),
                props.data ? props.data[0].currency : "EUR",
              )
            }
          />
          <LineChart.Axis
            position="bottom"
            orientation="horizontal"
            domain={[minTimestamp, maxTimestamp]}
            tickCount={Math.min(4, Math.max(2, flatData.length - 1))}
            color="#7C8AA5"
            textStyle={{ fontSize: 9 }}
            format={(value) =>
              new Date(Number(value)).toLocaleDateString(locale, {
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
    width: "100%",
    height: 220,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
