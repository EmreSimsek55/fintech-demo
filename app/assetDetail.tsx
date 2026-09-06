import LinechartInteractive from "@/components/LinechartInteractive";
import { formatCurrency, getAssetById } from "@/services/AssetService";
import { Asset, Assets } from "@/types/Asset";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// MOCK_DATA
import * as mockData from "@/assets/mock.json";

export default function ModalScreen() {
  const [mappedData, setMappedData] = useState<Asset[]>([]);
  const [selectedChartPointValue, setSelectedChartPointValue] =
    useState<number>(0);

  const { top } = useSafeAreaInsets();

  const portfolioCurrency = (mockData as Assets).assets[0]?.currency ?? "EUR";

  const { assetId } = useLocalSearchParams<{ assetId: string }>();

  useEffect(() => {
    if (!assetId) return;

    const asset: Asset | undefined = getAssetById(assetId);

    if (!asset) return;

    setMappedData([asset]);
  }, [assetId]);

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Text style={styles.assetDisplayText}>{mappedData[0]?.name}</Text>

      <Text style={styles.totalValueText}>
        {formatCurrency(selectedChartPointValue, portfolioCurrency)}
      </Text>

      <View style={styles.mt40}>
        <LinechartInteractive
          data={mappedData}
          onCurrentValueChange={(value) => {
            setSelectedChartPointValue(value);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mt40: {
    marginTop: 40,
  },
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 12,
  },
  totalValueText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 24,
    marginTop: 24,
  },
  assetDisplayText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 24,
    fontWeight: "bold",
    marginTop: 24,
  },
});
