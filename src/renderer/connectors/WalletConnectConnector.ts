import { WalletConnect } from '@web3-react/walletconnect';

export class WalletConnectConnector extends WalletConnect {
  public EVENT_NAME_URI_AVAILABLE = 'URI_AVAILABLE';

  public addURIListenerEvent(callback: (uri: string) => void) {
    this.events.on(this.EVENT_NAME_URI_AVAILABLE, callback);
  }

  public get isConnected(): boolean {
    return this.provider ? this.provider.connected : false;
  }
}
