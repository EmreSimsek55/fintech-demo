import { PricePoint } from "./Pricepoint";

export type Asset = {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  currency: "EUR" | "USD";
  history: PricePoint[];
};
