interface BasicChainInformation {
  urls: string[];
  name: string;
}

export const CHAINS: { [chainId: number]: BasicChainInformation } = {
  56: {
    urls: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
    ],
    name: 'BSC Mainnet',
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
