import { initializeConnector } from '@web3-react/core';
import { URLS } from './chains';
import { WalletConnectConnector } from './WalletConnectConnector';

export const [walletConnect, hooks] =
  initializeConnector<WalletConnectConnector>(
    (actions) =>
      new WalletConnectConnector(
        actions,
        {
          rpc: URLS,
          qrcode: false,
        },
        false
      ),
    Object.keys(URLS).map((chainId) => Number(chainId))
  );
