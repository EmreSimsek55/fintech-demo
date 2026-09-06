import { Asset } from "@/types/Asset";
import { getLocales } from "expo-localization";

// MOCK_DATA
import * as mockData from "@/assets/mock.json";

export function getAssetPerformanceInPercentage(asset: Asset):
  | {
      percentage: number;
      isPositiveValue: boolean;
    }
  | undefined {
  if (!asset.history.length || asset.boughtAt === 0) return undefined;

  const currentAssetPrice = asset.history[asset.history.length - 1].price;

  const percentage =
    ((currentAssetPrice - asset.boughtAt) / asset.boughtAt) * 100;

  const isPositiveValue = percentage >= 0;

  return { percentage, isPositiveValue };
}

export function formatCurrency(value: number, currency: "EUR" | "USD" = "EUR") {
  const locale = getLocales()[0].languageTag;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
}

export function formatNumber(value: number, maximumFractionDigits = 2) {
  const locale = getLocales()[0].languageTag;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

export function getAssetById(id: string): Asset | undefined {
  const asset: Asset = mockData.assets.find(
    (asset) => asset.id === id,
  ) as Asset;

  if (!asset) return;

  return asset;
}
