import React, { useCallback, useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { hooks, walletConnect } from '../../connectors/walletConnect';
import { ChainIdNotAllowedError } from '@web3-react/store';
import { Typography } from '@mui/material';

export function WalletConnectButton() {
  const { useChainId, useAccounts, useError, useIsActivating, useIsActive } =
    hooks;

  const chainId = useChainId();
  const accounts = useAccounts();
  const error = useError();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  const [uri, setUri] = useState<string>('');
  const qrCodeRef = useRef<HTMLCanvasElement>(null);

  const uriCallback = useCallback(
    (_uri: string) => {
      setUri(_uri);
    },
    [setUri]
  );

  const makeQR = (_uri: string) => {
    QRCode.toCanvas(qrCodeRef.current, _uri, function (_error: any) {
      if (_error) console.error(_error);
    });
  };

  const handleDisconnect = () => {
    walletConnect.deactivate();
  };

  useEffect(() => {
    if (!isActivating && !isActive && !accounts && !walletConnect.isConnected) {
      walletConnect.activate();
    }
  }, [accounts, isActive, isActivating]);

  useEffect(() => {
    walletConnect.addURIListenerEvent(uriCallback);
    return () => {
      walletConnect.events.removeListener(
        walletConnect.EVENT_NAME_URI_AVAILABLE,
        uriCallback
      );
    };
  }, [uriCallback]);

  useEffect(() => {
    console.log(error);
    if (error) {
      if (error instanceof ChainIdNotAllowedError) {
        alert('Please switch chain to BSC!');
      }
      handleDisconnect();
    }
  }, [error]);

  useEffect(() => {
    if (uri) {
      makeQR(uri);
    }
  }, [uri]);

  return (
    <>
      {!walletConnect.isConnected && (
        <>
          {!uri && (
            <Typography color="white" variant="h6" gutterBottom component="div">
              QR loading...
            </Typography>
          )}
          <canvas ref={qrCodeRef} />
        </>
      )}
      {walletConnect.isConnected && (
        <button type="button" onClick={handleDisconnect}>
          disconnect
        </button>
      )}
    </>
  );
}
