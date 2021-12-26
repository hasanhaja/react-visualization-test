import React from 'react';

import styled from 'styled-components';
import {gql, useQuery} from "@apollo/client";

interface Post {
  title: string;
  body: string;
  createdAt: string;
}

interface AllPostsData {
  allPosts: Array<Post>;
}

interface AllPostsVars {
  count: number;
}

const GET_ALL_POSTS = gql`
  query GetAllPost($count: Int!) {
    allPosts(count: $count) {
      title
      body
      createdAt
    }
  }
`;

function Display({ allPosts }: AllPostsData): JSX.Element {

  console.log(allPosts);

  return (
    <>
      {allPosts.map((post) => (
        <>
          <h4>{post.title}</h4>
          <h4>{post.body}</h4>
          <h4>{post.createdAt}</h4>
        </>
      ))
      }
    </>
  );
}

export function App() {

  const { loading, data } = useQuery<AllPostsData, AllPostsVars>(
    GET_ALL_POSTS,
    { variables: { count: 10 } }
  );

  return (<div>
    <h1>All posts</h1>
    {
      loading ? (
        <p>Loading...</p>
      ) : (
        data && (<Display allPosts={data.allPosts}/>)
      )
    }

  </div>);
}

export default App;
