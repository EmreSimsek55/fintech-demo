import Icons from "@/enums/Icons";
import {
    formatCurrencyValueToLocale,
    getAssetPerformanceInPercentage,
} from "@/services/AssetService";
import { Asset } from "@/types/Asset";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  asset: Asset;
};

export function AssetCard(props: Props) {
  const { t } = useTranslation();
  const [assetPerformanceInPercentage, setAssetPerformanceInPercentage] =
    useState<number>(0);
  const [assetPerformanceIsPositive, setAssetPerformanceIsPositive] =
    useState<boolean>(false);

  useEffect(() => {
    const assetPerformance = getAssetPerformanceInPercentage(props.asset);

    if (!assetPerformance) return;

    setAssetPerformanceInPercentage(assetPerformance.percentage);
    setAssetPerformanceIsPositive(assetPerformance.isPositiveValue);
  }, [props.asset]);

  return (
    <View style={styles.container}>
      <View style={styles.flexOne}>
        <Text style={styles.assetTitle}>{props.asset.name}</Text>
        <Text style={styles.assetText}>
          {t("assetCard.quantity", {
            quantity: formatCurrencyValueToLocale(
              props.asset.quantity,
              props.asset.currency,
            ),
          })}
        </Text>
        <Text style={styles.assetText}>
          {t("assetCard.boughtAt", {
            boughtAt: formatCurrencyValueToLocale(
              props.asset.boughtAt,
              props.asset.currency,
            ),
          })}
        </Text>
        <Text
          style={{
            color: assetPerformanceIsPositive ? "#1ED39A" : "#FF5C5C",
            fontSize: 14,
          }}
        >
          {assetPerformanceInPercentage >= 0 ? "+" : "-"}
          {formatCurrencyValueToLocale(
            Math.abs(assetPerformanceInPercentage),
            props.asset.currency,
          )}{" "}
          %
        </Text>
      </View>
      <View style={styles.chevronRightIcon}>
        <Image source={Icons.CHEVRON_RIGHT_24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 24,
    borderRadius: 16,
    borderBottomWidth: 1,
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
  },
  assetTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  assetText: {
    color: "#fff",
    fontSize: 14,
  },
  flexOne: {
    flex: 1,
  },
  chevronRightIcon: {
    justifyContent: "center",
    alignItems: "flex-end",
    paddingLeft: 12,
    marginLeft: "auto",
  },
});
