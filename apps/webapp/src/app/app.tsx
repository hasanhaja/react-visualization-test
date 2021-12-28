import React, { useEffect } from 'react';

import {useQuery} from "@apollo/client";
import Visualize from './visualize/visualize';
import { AllPostsData, AllPostsVars, GET_ALL_POSTS_QUERY } from '@react-visualization-test/api';
import { Alert, CircularProgress, Snackbar, Typography } from '@mui/material';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f5f6f7;
  height: 100vh;
  width: 100%;
  padding: 2em 4em 1em;
`;

export function App() {

  const width = 800;
  const height = 600;
  const margin = {
    top: 10,
    bottom: 10,
    left: 0,
    right: 0,
  };

  const count = 1000;

  const { loading, data } = useQuery<AllPostsData, AllPostsVars>(
    GET_ALL_POSTS_QUERY,
    { variables: { count: count } }
  );

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    setOpenAlert(!loading);
  }, [loading]);

  return (
    <Container>
      <Typography variant="h2" component="div" gutterBottom>
        React Visualization Test
      </Typography>

      <Typography variant="h4" component="div" gutterBottom>
        Top 3 topics by month
      </Typography>
      <Typography variant="subtitle1" component="div" gutterBottom>{`Based on ${count} data points`}</Typography>
      {
        loading ? (
          <CircularProgress thickness={6} />
        ) : (
          data && (<Visualize data={data} width={width} height={height} margin={margin} />)
        )
      }
      <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Data loaded successfully
        </Alert>
      </Snackbar>
  </Container>);
}

export default App;
