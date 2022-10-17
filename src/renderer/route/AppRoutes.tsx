import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { NoMatch } from '../components/NoMatch';
import { AuthorizedRoute } from './AuthorizedRoute';
import { useIsWalletConnected } from '../context/AuthContext';

const LazyHome = React.lazy(() => import('../pages/Home'));
const LazyLogin = React.lazy(() => import('../pages/Login'));

export const AppRoutes = () => {
  const walletConnected = useIsWalletConnected();
  useEffect(() => {
    console.log('app routes walletconnected', walletConnected);
  }, [walletConnected]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          backgroundColor: 'rgba(0,0,0,0.5)',
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Container maxWidth="xl">
          <Routes>
            <Route
              path="/login"
              element={
                <React.Suspense fallback="Loading...">
                  <LazyLogin />
                </React.Suspense>
              }
            />
            <Route
              path="/"
              element={<AuthorizedRoute auth={walletConnected} />}
            >
              <Route
                path="/"
                element={
                  <React.Suspense fallback="Loading...">
                    <LazyHome />
                  </React.Suspense>
                }
              />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
};
