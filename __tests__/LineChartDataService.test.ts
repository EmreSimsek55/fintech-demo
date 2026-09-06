import { mapLineChartData } from "@/services/LineChartDataService";

type HistoryPoint = { timestamp: string; price: number };

const makeAsset = (
  quantity: number,
  boughtAt: number,
  boughtTime: string,
  history: HistoryPoint[],
) => ({
  id: "a",
  symbol: "XXX",
  name: "X",
  quantity,
  boughtAt,
  boughtTime,
  currency: "EUR",
  history,
});

describe("mapLineChartData", () => {
  it("returns empty array for no assets", () => {
    expect(mapLineChartData(undefined)).toEqual([]);
    expect(mapLineChartData([])).toEqual([]);
  });

  it("maps timestamps and computes portfolio value", () => {
    const assets = [
      makeAsset(2, 10, "2026-01-01T00:00:00Z", [
        { timestamp: "2026-01-01T00:00:00Z", price: 12 },
        { timestamp: "2026-01-02T00:00:00Z", price: 11 },
      ]),
      makeAsset(1, 5, "2026-01-01T00:00:00Z", [
        { timestamp: "2026-01-02T00:00:00Z", price: 6 },
      ]),
    ];

    const result = mapLineChartData(assets as any) as any;

    // Should produce timestamps for 2026-01-01 and 2026-01-02 (in ms)
    expect(result.length).toBe(2);

    const t0 = new Date("2026-01-01T00:00:00Z").getTime();
    const t1 = new Date("2026-01-02T00:00:00Z").getTime();

    expect(result[0].timestamp).toBe(t0);
    expect(result[1].timestamp).toBe(t1);

    // Values: at t0 -> asset1: 2*12=24, asset2 uses boughtAt 5 -> 1*5=5 => total 29
    expect(result[0].value).toBe(29);

    // at t1 -> asset1 latest price 11 -> 2*11=22, asset2 price 6 -> 1*6=6 => total 28
    expect(result[1].value).toBe(28);
  });
});
