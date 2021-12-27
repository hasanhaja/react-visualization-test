import LikelyTopic from './LikelyTopic';

export interface Post {
  title: string;
  createdAt: string;
  likelyTopics: Array<LikelyTopic>
}

export default Post;
