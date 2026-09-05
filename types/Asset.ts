import { PricePoint } from "./Pricepoint";

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  boughtAt: number;
  boughtTime: string;
  currency: "EUR" | "USD";
  history: PricePoint[];
};

export type Assets = {
  assets: Asset[];
};
