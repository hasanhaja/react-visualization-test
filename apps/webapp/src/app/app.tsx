import React from 'react';

import {gql, useQuery} from "@apollo/client";
import Visualize from './visualize/visualize';
import { AllPostsData, AllPostsVars, GET_ALL_POSTS_QUERY } from '@react-visualization-test/api';

// export interface LikelyTopic {
//   label: string;
//   likelihood: number;
// }
//
// export interface Post {
//   title: string;
//   createdAt: string;
//   likelyTopics: Array<LikelyTopic>
// }
//
// export interface AllPostsData {
//   allPosts: Array<Post>;
// }
//
// export interface AllPostsVars {
//   count: number;
// }
//
// const GET_ALL_POSTS = gql`
//   query GetAllPost($count: Int!) {
//     allPosts(count: $count) {
//       title
//       createdAt
//       likelyTopics {
//         label
//         likelihood
//       }
//     }
//   }
// `;

export function App() {

  // TODO Consider making the variable a variable
  const { loading, data } = useQuery<AllPostsData, AllPostsVars>(
    GET_ALL_POSTS_QUERY,
    { variables: { count: 10 } }
  );

  return (<div>
    <h1>All posts</h1>
    {
      loading ? (
        <p>Loading...</p>
      ) : (
        data && (<Visualize data={data} />)
      )
    }

  </div>);
}

export default App;
