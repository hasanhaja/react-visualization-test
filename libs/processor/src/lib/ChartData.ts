import { MonthIndex } from '@react-visualization-test/processor';

export interface ChartData {
  month: MonthIndex;
  [label: string]: number;
}
