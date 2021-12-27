import styled from "styled-components";
import React from 'react';
import { AllPostsData } from '@react-visualization-test/api';
import { Bar } from '@visx/shape';
import { Processor } from '@react-visualization-test/processor';

export interface VisualizeProps {
  data: AllPostsData
}

const StyledVisualize = styled.div`
  color: pink;
`;

export function Visualize({ data }: VisualizeProps) {
  const processor = new Processor(data);
  const topicsByMonth = processor.top3TopicsByMonth;
  console.log(topicsByMonth);

  return (
    <StyledVisualize>
      <h1>Hello world</h1>
      {/*{data.allPosts.map((post) => (*/}
      {/*  <>*/}
      {/*    <h4>{post.title}</h4>*/}
      {/*    <h4>{post.createdAt}</h4>*/}
      {/*  </>*/}
      {/*))*/}
      {/*}*/}
    </StyledVisualize>
    // <Bar
    //   width={100}
    //   height={100}
    //   fill="rgba(23, 233, 217, .5)"
    // />
  );
}

export default Visualize;
