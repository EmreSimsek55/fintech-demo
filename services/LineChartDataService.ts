import { Asset } from "@/types/Asset";
import { TLineChartDataProp } from "react-native-wagmi-charts";

export function mapLineChartData(
  data:
    | {
        assets: Asset[];
      }
    | undefined,
): TLineChartDataProp {
  if (!data?.assets?.length) {
    return [];
  }

  const timestamps = new Set<number>();

  data.assets.forEach((asset) => {
    if (asset.boughtTime) {
      timestamps.add(new Date(asset.boughtTime).getTime());
    }

    asset.history.forEach((point) => {
      timestamps.add(new Date(point.timestamp).getTime());
    });
  });

  const sortedTimestamps = [...timestamps].sort((a, b) => a - b);

  return sortedTimestamps.map((timestamp) => {
    const totalPortfolioValue = data.assets.reduce((totalValue, asset) => {
      const history = [...asset.history].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );

      const latestPriceBeforeTimestamp = [...history]
        .reverse()
        .find(
          (point) => new Date(point.timestamp).getTime() <= timestamp,
        )?.price;

      const priceAtTime = latestPriceBeforeTimestamp ?? asset.boughtAt;

      return totalValue + asset.quantity * priceAtTime;
    }, 0);

    return {
      timestamp,
      value: totalPortfolioValue,
    };
  });
}
