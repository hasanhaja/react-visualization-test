import React from 'react';

import {useQuery} from "@apollo/client";
import Visualize from './visualize/visualize';
import { AllPostsData, AllPostsVars, GET_ALL_POSTS_QUERY } from '@react-visualization-test/api';

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
