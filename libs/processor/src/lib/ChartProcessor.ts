import { LikelyTopic } from '@react-visualization-test/api';
import { TopicsByMonthData } from '..';
import { ChartData } from './ChartData';

export class ChartProcessor {
  constructor(private readonly data: TopicsByMonthData) {}

  public get chartData(): Array<ChartData> {
    const rawChartData = Array.from(this.data.entries())
      .map(([monthIndex, topics]) => {
        const cd: ChartData = {
          month: monthIndex,
        };

        topics.forEach((topic) => {
          cd[topic.label] = topic.likelihood
        });

        return cd;
      });

    const sortedRawChartData = rawChartData.sort((a, b) => a.month - b.month);

    return ChartProcessor.padChartData(sortedRawChartData, this.uniqueKeys);
  }

  private get likelyTopics(): Array<LikelyTopic> {
    return Array.from(this.data.values())
      .flatMap((topics) => topics);
  }

  public get uniqueKeys(): Array<string> {
    const foundKeys = this.likelyTopics
      .map((topic) => topic.label);

    return [...new Set(foundKeys)];
  }

  /**
   * NOTE: These 9 colors are being hard-coded. A randomized approach is more general, but this guarantees the color palette.
   */
  public get keyColors(): Array<string> {
    return ["#ffc409", "#f14702", "#05445e", "#18a558", "#036ecd", "#9ecadd", "#51666e", "#01949a", "#fb4570"];
  }

  public get likelihoodDomain(): Array<number> {
    return this.likelyTopics.map((topic) => topic.likelihood);
  }

  private static padChartData(chartData: Array<ChartData>, keys: Array<string>): Array<ChartData> {
    chartData.forEach((data) => {
      keys.forEach((key) => {
        const dataPoint = data[key];
        if (dataPoint === undefined) {
          data[key] = 0;
        }
      })
    });

    return chartData;
  };
}
