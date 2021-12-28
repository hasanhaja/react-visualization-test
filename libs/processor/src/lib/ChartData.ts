import { MonthIndex } from "./processor";

export interface ChartData {
  month: MonthIndex;
  [label: string]: number;
}
