import { AssetCard } from "@/components/AssetCard";
import LinechartInteractive from "@/components/LinechartInteractive";
import { formatCurrencyValueToLocale } from "@/services/AssetService";
import { Asset, Assets } from "@/types/Asset";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// MOCK DATA
import * as mockData from "@/assets/mock.json";

export default function TabOneScreen() {
  const { t } = useTranslation();
  const { top, bottom } = useSafeAreaInsets();

  const portfolioCurrency = (mockData as Assets).assets[0]?.currency ?? "EUR";

  const [selectedChartPointValue, setSelectedChartPointValue] =
    useState<number>(0);

  return (
    <View style={[styles.flexOne, { marginTop: top }]}>
      <Text style={styles.welcomeText}>{t("portfolio.welcomeBack")}</Text>
      <View style={styles.flexOne}>
        <Text style={styles.totalValueText}>
          {t("portfolio.totalValue", {
            value: formatCurrencyValueToLocale(
              selectedChartPointValue,
              portfolioCurrency,
            ),
          })}
        </Text>
        <View style={styles.mt40}>
          <LinechartInteractive
            data={mockData.assets as Asset[]}
            onCurrentValueChange={(value) => {
              setSelectedChartPointValue(value);
            }}
          />
        </View>
      </View>
      <View style={styles.flexOne}>
        <FlatList
          data={mockData.assets as Asset[]}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View
              style={{
                marginBottom: mockData.assets.length - 1 === index ? bottom : 0,
              }}
            >
              <AssetCard
                asset={item}
                onPress={() =>
                  router.push({
                    pathname: "/assetDetail",
                    params: { assetId: item.id },
                  })
                }
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mt40: {
    marginTop: 40,
  },
  flexOne: {
    flex: 1,
  },
  totalValueText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginLeft: 24,
    marginTop: 48,
  },
  welcomeText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 24,
    fontWeight: "bold",
    marginTop: 24,
  },
});
