import LinechartInteractive from "@/components/LinechartInteractive";
import { Assets } from "@/types/Asset";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

// MOCK DATA
import * as mockData from "@/assets/mock.json";

export default function TabOneScreen() {
  const { t } = useTranslation();

  const [selectedChartPointValue, setSelectedChartPointValue] =
    useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.totalValueText}>
          {t("portfolio.totalValue", {
            value: selectedChartPointValue.toFixed(1).toString(),
          })}
        </Text>
        <LinechartInteractive
          data={mockData as Assets}
          onCurrentValueChange={(value) => {
            setSelectedChartPointValue(value);
          }}
        />
      </View>
      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  totalValueText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 24,
    marginTop: 48,
  },
  spacer: {
    flex: 1,
  },
});
