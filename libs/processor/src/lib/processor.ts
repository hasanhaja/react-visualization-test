import { AllPostsData, LikelyTopic, Post } from '@react-visualization-test/api';

export interface ProcessedAllPostsData {
  allPosts: Array<ProcessedPost>;
}

export type MonthIndex = number;

export interface ProcessedPost {
  title: string;
  createdAt: MonthIndex;
  likelyTopics: Array<LikelyTopic>;
}

export class Processor {
  constructor(
    private readonly data: AllPostsData,
  ) {}

  public get result(): ProcessedAllPostsData {
    return {
      allPosts: this.data.allPosts.map(Processor.processPost),
    };
  }

  public get top3TopicsByMonth(): Map<MonthIndex, Array<LikelyTopic>> {
    const top3TopicsByMonthMap = this.topicsByMonth;

    top3TopicsByMonthMap.forEach((likelyTopics, month) => {
      top3TopicsByMonthMap.set(month, likelyTopics.slice(0, 3));
    });

    return top3TopicsByMonthMap;
  }

  private get topicsByMonth(): Map<MonthIndex, Array<LikelyTopic>> {
    const topicsByMonthMap = new Map<MonthIndex, Array<LikelyTopic>>();

    this.result.allPosts
      .forEach((post) =>
        topicsByMonthMap.set(
          post.createdAt,
          Processor.combineLikelyTopics(post.likelyTopics, topicsByMonthMap.get(post.createdAt))
        )
      );

    topicsByMonthMap.forEach((likelyTopics, month ) => {
      const topicsCopy = [...likelyTopics];
      const sortedInDescendingOrder = topicsCopy.sort(
        (a, b) => b.likelihood - a.likelihood
      );

      topicsByMonthMap.set(month, sortedInDescendingOrder);
    });

    return topicsByMonthMap;
  }

  private static combineLikelyTopics(
    current: Array<LikelyTopic>,
    existing: Array<LikelyTopic> | undefined): Array<LikelyTopic>
  {
    if (existing === undefined) {
      return current;
    }

    const currentLikelyTopics = new Map<string, number>();
    current.forEach(({ label, likelihood }) => currentLikelyTopics.set(label, likelihood));

    const getCurrentLikelihood = (label: string): number => {
      const likelihood = currentLikelyTopics.get(label);

      return likelihood === undefined ? 0 : likelihood;
    }

    // TODO check if there is a more performant way
    existing.forEach(({ label, likelihood}) =>
      currentLikelyTopics.set(label, getCurrentLikelihood(label) + likelihood)
    );

    const result = Array.from(currentLikelyTopics)
      .map(([label, likelihood]) => {
        const likelyTopic: LikelyTopic = { label, likelihood };
        return likelyTopic;
      });

    return result;
  }

  private static processPost(post: Post): ProcessedPost {
    return {
      title: post.title,
      createdAt: new Date(parseInt(post.createdAt)).getMonth(),
      likelyTopics: post.likelyTopics,
    };
  }
}

export default Processor;
