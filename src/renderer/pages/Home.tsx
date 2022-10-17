import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { hooks } from '../connectors/walletConnect';
import { walletConnect } from '../connectors/walletConnect';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';

export default function Home() {
  const { useAccounts } = hooks;
  const accounts = useAccounts();
  return (
    <Grid
      container
      spacing={6}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography color="white" variant="h4" gutterBottom component="div">
          Wallet Connected!
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="white" variant="h4" gutterBottom component="div">
          {accounts && accounts[0]}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          onClick={() => {
            walletConnect.deactivate();
          }}
          variant="contained"
        >
          DISCONNECT
        </Button>
      </Grid>
      <a
        href="https://github.com/umutgundogdu/electron-walletconnect"
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
  );
}
