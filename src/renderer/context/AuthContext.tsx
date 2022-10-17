import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { hooks, walletConnect } from '../connectors/walletConnect';

const BSC_CHAIN = 56;

type AuthStateType = {
  walletConnected: boolean;
  bridgeURI: string;
};

type AuthContextType = {
  authState: AuthStateType | undefined;
  setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>> | undefined;
};

const AuthContext = createContext<AuthContextType>({
  authState: undefined,
  setAuthState: undefined,
});

export function useAuthState() {
  return useContext(AuthContext);
}

export function useIsWalletConnected(): boolean {
  const state = useAuthState();
  return state.authState ? state.authState.walletConnected : false;
}

export function useBridgeURI(): string {
  const state = useAuthState();
  return state.authState ? state.authState.bridgeURI : '';
}

export function useSetIsWalletConnected() {
  const manager = useAuthState();
  return useMemo(
    () => (walletConnected: boolean) =>
      manager.setAuthState
        ? manager?.setAuthState((prev) => ({ ...prev, walletConnected }))
        : null,
    [manager]
  );
}

export function useSetBridgeURI() {
  const manager = useAuthState();
  return useMemo(
    () => (bridgeURI: string) =>
      manager.setAuthState
        ? manager.setAuthState((prev) => ({ ...prev, bridgeURI }))
        : null,
    [manager]
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthStateType>({
    walletConnected: false,
    bridgeURI: '',
  });

  const { useAccounts, useChainId } = hooks;

  const accounts = useAccounts();
  const chainId = useChainId();

  useEffect(() => {
    setAuthState((prev) => ({
      ...prev,
      walletConnected: walletConnect.isConnected, // check chainID = && chainId == BSC_CHAIN
    }));
  }, [accounts, chainId]);

  return (
    <AuthContext.Provider
      children={children}
      value={{ authState, setAuthState }}
    />
  );
}
