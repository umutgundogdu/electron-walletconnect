import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';

import { useNavigate } from 'react-router-dom';
import Walletconnectlogo from '../../assets/walletconnectlogo.png';
import { WalletConnectButton } from '../components/wallet-connect/WalletConnectButton';
import { useIsWalletConnected } from '../context/AuthContext';
import { Button, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

const Login = () => {
  const walletConnected = useIsWalletConnected();
  const navigate = useNavigate();
  useEffect(() => {
    if (walletConnected) {
      console.log('navigating to home..');
      navigate('/');
    }
  }, [navigate, walletConnected]);
  return (
    <>
      <Grid
        container
        spacing={6}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item>
          <img src={Walletconnectlogo} width="180" alt="umutgundogdu" />
        </Grid>
        <Grid item>
          <Typography color="white" variant="h4" gutterBottom component="div">
            Electron Walletconnect
          </Typography>
        </Grid>
        <Grid item>
          <Typography color="white" variant="h4" gutterBottom component="div">
            Scan QR to login
          </Typography>
        </Grid>
        <Grid item>
          <WalletConnectButton />
        </Grid>
        <Grid item>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            variant="contained"
          >
            Refresh
          </Button>
        </Grid>
        <a
          href="https://github.com/umutgundogdu"
          target="_blank"
          style={{ position: 'fixed', bottom: 50, right: 100, color: 'white' }}
        >
          <GitHubIcon />
        </a>
        <a
          href="https://twitter.com/umutgundgdu"
          target="_blank"
          style={{ position: 'fixed', bottom: 50, right: 50, color: 'white' }}
        >
          <TwitterIcon />
        </a>
      </Grid>
    </>
  );
};

export default Login;
