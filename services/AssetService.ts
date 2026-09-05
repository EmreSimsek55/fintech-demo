import { Asset } from "@/types/Asset";

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

export function formatCurrencyValueToLocale(
  value: number,
  currency: "EUR" | "USD",
) {
  const locale = currency === "EUR" ? "de-DE" : "en-US";

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
