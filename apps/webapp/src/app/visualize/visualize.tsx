import styled from "styled-components";
import React from 'react';
import { AllPostsData } from '@react-visualization-test/api';

export interface VisualizeProps {
  data: AllPostsData
}

const StyledVisualize = styled.div`
  color: pink;
`;

export function Visualize({ data }: VisualizeProps) {
  return (
    <StyledVisualize>
      {data.allPosts.map((post) => (
        <>
          <h4>{post.title}</h4>
          <h4>{post.createdAt}</h4>
        </>
      ))
      }
    </StyledVisualize>
  );
}

export default Visualize;
