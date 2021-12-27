import { gql } from '@apollo/client';

export const GET_ALL_POSTS_QUERY = gql`
  query GetAllPost($count: Int!) {
    allPosts(count: $count) {
      title
      createdAt
      likelyTopics {
        label
        likelihood
      }
    }
  }
`;
