// Mock expo-localization to avoid transforming node_modules in Jest
jest.mock("expo-localization", () => ({
  getLocales: () => [{ languageTag: "en-US" }],
}));

import {
    getAssetById,
    getAssetPerformanceInPercentage,
} from "@/services/AssetService";

describe("AssetService", () => {
  describe("getAssetPerformanceInPercentage", () => {
    it("returns undefined for empty history or zero boughtAt", () => {
      const asset = { id: "x", history: [], boughtAt: 10 } as any;
      expect(getAssetPerformanceInPercentage(asset)).toBeUndefined();

      const asset2 = {
        id: "x",
        history: [{ timestamp: "t", price: 5 }],
        boughtAt: 0,
      } as any;
      expect(getAssetPerformanceInPercentage(asset2)).toBeUndefined();
    });

    it("calculates percentage and sign correctly", () => {
      const asset = {
        id: "x",
        history: [{ timestamp: "t", price: 20 }],
        boughtAt: 10,
      } as any;

      const res = getAssetPerformanceInPercentage(asset)!;
      expect(res.isPositiveValue).toBe(true);
      // (20-10)/10*100 = 100
      expect(Math.round(res.percentage)).toBe(100);
    });
  });

  describe("getAssetById", () => {
    it("returns an asset from mock data when id exists", () => {
      const asset = getAssetById("asset_001");
      expect(asset).toBeDefined();
      expect(asset?.id).toBe("asset_001");
    });
  });
});
